import {UserData} from "../automation/templates";
import {
    CategoryEntry,
    CauseEntry,
    PetitionEntry,
    PetitionTable, RunEntry, RunTable, SignatureEntry,
    SiteTable,
    UserEntry,
    UserTable
} from "./schema";

type PetitionTablePredicate = {
    causePred: (cause: CauseEntry) => boolean,
    categoryPred: (category: CategoryEntry) => boolean,
    petitionPred: (petition: PetitionEntry) => boolean,
}

export abstract class DatabaseManager {
    abstract init(): Promise<DatabaseManager>;
    abstract getPetitionTable(): Promise<PetitionTable>;
    abstract setPetitionTable(petitionTable: PetitionTable): Promise<void>;
    abstract getSiteTable(): Promise<SiteTable>;
    abstract setSiteTable(siteTable: SiteTable): Promise<void>;
    abstract getUserTable(): Promise<UserTable>;
    abstract setUserTable(users: UserTable): Promise<void>;
    abstract getRunTable(): Promise<RunTable>;
    abstract setRunTable(runTable: RunTable): Promise<void>;
    abstract getCauses(): Promise<Array<CauseEntry>>;
    abstract getCauseById(causeId: string): Promise<CauseEntry>;
    abstract getCategoriesByCause(causeId: string): Promise<Array<CategoryEntry>>;
    abstract getCategoryById(categoryId: string): Promise<CategoryEntry>;
    abstract getPetitionsByCategory(categoryId: string): Promise<Array<PetitionEntry>>;
    abstract getPetitionById(petitionId: string): Promise<PetitionEntry>;
    abstract addUser(user: UserData, id?: string): Promise<UserEntry>;
    abstract getUsers(): Promise<Array<UserEntry>>;
    abstract getRunsByUser(userId: string): Promise<Array<RunEntry>>;
    abstract getSignatureEntries(userId: string): Promise<Array<SignatureEntry>>;
    abstract getSignedPetitionIds(userId: string): Promise<Array<SignatureEntry>>;
    abstract getUnsignedPetitionsByCategory(userId: string, categoryId: string): Promise<Array<PetitionEntry>>;
    abstract filterPetitionTable(pred: PetitionTablePredicate): Promise<PetitionTable>;
}

declare global {
    interface Window {
        _dbMan: DatabaseManager;
        _dbManPromise: Promise<DatabaseManager>;
    }
}

