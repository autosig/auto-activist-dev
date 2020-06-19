import { uuid } from "uuidv4";
import {
    CategoryEntry,
    CauseEntry,
    PetitionEntry,
    PetitionTable, RunEntry, RunTable, SignatureEntry,
    SiteTable, UserData,
    UserEntry,
    UserTable
} from "./schema";
import {browser} from "webextension-polyfill-ts";
import {petitions, runs, sites, users} from "./default-db";
import {DatabaseManager} from "./interface";

const petitionTableKey = 'PetitionTable';
const sitesTableKey = 'SiteTable';
const runTableKey = 'RunTable';
const userTableKey = 'UserTable';

function flatten<T>(arr: Array<Array<T>>): Array<T> {
    return [].concat.apply([], arr);
}

interface Mapping<T> {
    [id: string]: T
}

function values<T>(mapping: Mapping<T>) {
    return Object.keys(mapping).map(k => mapping[k]);
}

type PetitionTablePredicate = {
    causePred: (cause: CauseEntry) => boolean,
    categoryPred: (category: CategoryEntry) => boolean, filterMapRunsTable()

    petitionPred: (petition: PetitionEntry) => boolean,
}

export class LocalStorageDatabaseManager extends DatabaseManager {
    private siteTable: SiteTable;
    private petitionTable: PetitionTable;
    constructor(
    ) {
        super();
    }

    init(): Promise<LocalStorageDatabaseManager> {
        return Promise.all([
            this.setIfNotPresent<PetitionTable>(petitionTableKey, { causes: [] }),
            this.setIfNotPresent<SiteTable>(sitesTableKey, { sites: [] }),
            this.setIfNotPresent<RunTable>(runTableKey, { runs: [] }),
            this.setIfNotPresent<UserTable>(userTableKey, { users: [] }),
        ]).then(() => Promise.all([
            this.setPetitionTable(petitions),
            this.setSiteTable(sites),
            this.setRunTable(runs),
            this.setUserTable(users)
        ])).then(() => this);
    }

    private setIfNotPresent<T>(key: string, val: T): Promise<void> {
        return this.getStorage<T>(key)
            .then((v) => {
                if (v === undefined)
                    throw new Error('could not find key');
            })
            .catch(() => this.setStorage<T>(key, val));
    }

    /**
     * @returns Promise<undefined> if not found
     */
    private getStorage<T>(key: string): Promise<T> {
        return browser.storage.local
            .get(key)
            .then(o => (o[key] as T));
    }

    private setStorage<T>(key: string, value: T): Promise<void> {
        return browser.storage.local.set({
            [key]: value
        })
    }

    getPetitionTable(): Promise<PetitionTable> {
        if (this.petitionTable)
            return new Promise<PetitionTable>(res => res(this.petitionTable));
        return this.getStorage<PetitionTable>(petitionTableKey)
            .then(petitionTable => {
                this.petitionTable = petitionTable;
                return this.petitionTable;
            });
    }

    setPetitionTable(petitionTable: PetitionTable): Promise<void> {
        this.petitionTable = petitionTable;
        return this.setStorage<PetitionTable>(petitionTableKey, petitionTable);
    }

    getSiteTable(): Promise<SiteTable> {
        if (this.siteTable)
            return new Promise<SiteTable>(res => res(this.siteTable));
        return this.getStorage<SiteTable>(sitesTableKey)
            .then(siteTable => {
                this.siteTable = siteTable;
                return this.siteTable;
            });
    }

    setSiteTable(siteTable: SiteTable): Promise<void> {
        this.siteTable = siteTable;
        return this.setStorage<SiteTable>(sitesTableKey, siteTable);
    }

    getUserTable(): Promise<UserTable> {
        return this.getStorage<UserTable>(userTableKey);
    }

    setUserTable(users: UserTable): Promise<void> {
        return this.setStorage<UserTable>(userTableKey, users);
    }

    getRunTable(): Promise<RunTable> {
        return this.getStorage<RunTable>(runTableKey);
    }

    setRunTable(runTable: RunTable): Promise<void> {
        return this.setStorage<RunTable>(runTableKey, runTable);
    }

    getCauses(): Promise<Array<CauseEntry>> {
        return this.getPetitionTable().then(table => table.causes);
    }

    getCauseById(causeId: string): Promise<CauseEntry> {
        return this.getPetitionTable().then((petitionTable: PetitionTable) => {
            const causes = petitionTable.causes.filter(c => c.id === causeId);
            if (causes.length === 0) {
                throw new Error('Cause id ' + causeId + ' is not present');
            }
            return causes[0];
        });
    }

    getCategoriesByCause(causeId: string): Promise<Array<CategoryEntry>> {
        return this.getCauseById(causeId).then(cause => cause.categories);
    }

    getCategoryById(categoryId: string): Promise<CategoryEntry> {
        return this.getPetitionTable().then((petitionTable: PetitionTable) => {
            const causes = petitionTable.causes;
            const categories = flatten(causes.map(c => c.categories));

            const categorySingleton = categories.filter(c => c.id === categoryId);
            if (categorySingleton.length === 0) {
                throw new Error('Category id ' + categoryId + ' not present');
            }
            return categorySingleton[0];
        });
    }

    getPetitionsByCategory(categoryId: string): Promise<Array<PetitionEntry>> {
        return this.getCategoryById(categoryId).then(category => category.petitions);
    }

    getPetitionById(petitionId: string): Promise<PetitionEntry> {
        return this.getPetitionTable().then((petitionTable: PetitionTable) => {
            const causes = petitionTable.causes;
            const categories = flatten(causes.map(c => c.categories));
            const petitions = flatten(categories.map(c => c.petitions));
            const petitionSingleton = petitions.filter(p => p.id === petitionId);
            if (petitionSingleton.length === 0) {
                throw new Error('Petition id ' + petitionId + ' not present');
            }
            return petitionSingleton[0];
        });
    }

    addUser(user: UserData, id?: string): Promise<UserEntry> {
        return this.getUserTable().then((userTable: UserTable) => {
            const entry: UserEntry = {
                id: id || `user/${uuid()}`,
                ...user
            };
            userTable.users.push(entry);
            return this.setUserTable(userTable).then(() => entry);
        })
    }

    getUsers(): Promise<Array<UserEntry>> {
        return this.getUserTable().then(u => u.users);
    }

    getRunsByUser(userId: string): Promise<Array<RunEntry>> {
        return this.getRunTable().then((runTable: RunTable) =>
            runTable.runs.filter(run => run.userId === userId));
    }

    getSignatureEntries(userId: string): Promise<Array<SignatureEntry>> {
        return this.getRunsByUser(userId).then((runs: [RunEntry]) =>
            flatten(runs.map(run => run.signatures)));
    }

    getSignedPetitionIds(userId: string): Promise<Array<SignatureEntry>> {
        return this.getSignatureEntries(userId)
            .then(signatureEntries => signatureEntries.filter(e => e.status === 'success'));
    }

    getUnsignedPetitionsByCategory(userId: string, categoryId: string): Promise<Array<PetitionEntry>> {
        return Promise.all([this.getSignedPetitionIds(userId), this.getPetitionsByCategory(categoryId)]).then(
            ([signedEntries, petitions]) => {
                const signedPetitionIds = signedEntries.map(e => e.petitionId);
                return petitions.filter(p => !signedPetitionIds.includes(p.id));
            });
    }

    setSignatureEntry(signatureEntry: SignatureEntry): Promise<SignatureEntry> {
        return this.getRunTable().then(runTable => {
            runTable.runs.forEach(run => {
                const idx = run.signatures.findIndex(sig => sig.id === signatureEntry.id);
                run.signatures[idx] = signatureEntry;
            });
            return this.setRunTable(runTable);
        }).then(() => signatureEntry);
    }

    filterPetitionTable(pred: PetitionTablePredicate): Promise<PetitionTable> {
        const {causePred, categoryPred, petitionPred} = {
            causePred: () => true,
            categoryPred: () => true,
            petitionPred: () => true,
            ...pred
        };
        return this.getPetitionTable().then((petitionTable: PetitionTable) => {
            return {
                ...petitionTable,
                causes: petitionTable.causes.map((cause: CauseEntry) => {
                    return {
                        ...cause,
                        categories: cause.categories.map((category => {
                            return {
                                ...category,
                                petitions: category.petitions.filter(petitionPred),
                            }
                        })).filter(categoryPred)
                    }
                }).filter(causePred)
            };
        })
    }
}

export function getDatabaseManager(): Promise<DatabaseManager> {
    if (window._dbMan) {
        return new Promise<DatabaseManager>(res => res(window._dbMan));
    }
    window._dbManPromise = window._dbManPromise || new LocalStorageDatabaseManager().init().then(dbMan => {
        window._dbMan = dbMan;
        return window._dbMan;
    });
    return window._dbManPromise;
}
