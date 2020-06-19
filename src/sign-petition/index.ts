import {PetitionEntry, RunEntry, SignatureEntry, SignatureStatus, UserEntry} from "../db/schema";
import {scripts} from "./script-registry";
import {TabController} from "../tab-controller/tab-controller";
import {getDatabaseManager} from "../db";
import {loadOverlayInjectJs} from "../overlay-content/load-overlay-inject";
import {uuid} from "uuidv4";
import {runCancellationPromise} from "../overlay-content/cancel";
import {sleep} from "./script-lib";

export interface SignPetitionParams {
    petition: PetitionEntry,
    signature: SignatureEntry,
    run: RunEntry,
    user: UserEntry
}

function setSigStatusInDb(sig: SignatureEntry): Promise<SignatureEntry> {
    return getDatabaseManager().then(db => db.setSignatureEntry(sig));
}

function sigStatus(sig: SignatureEntry, status: SignatureStatus, errReason?: string): SignatureEntry {
    return {
        ...sig,
        status,
        errReason
    }
}

export function signPetition(params: SignPetitionParams, runCancelledPromise: Promise<void>): Promise<SignatureEntry> {
    const petitionScript = scripts[params.petition.siteDomain];
    const injectScriptId = uuid();
    let tc: TabController;
    let res: SignatureEntry;
    return setSigStatusInDb(sigStatus(params.signature, "started"))
        .then(() => TabController.createTab())
        .then(_tc => (tc = _tc))
        .then(() => loadOverlayInjectJs({
            overlayInjectId: injectScriptId,
            runId: params.run.id,
            petitionEntry: params.petition
        }))
        .then(js => tc.setRunAtLoadScript(js))
        .then(() => Promise.race([
            runCancelledPromise
                .then(() => sigStatus(params.signature, "cancelled")),
            Promise.resolve()
                .then(() => petitionScript.script(tc, {
                    url: params.petition.url,
                    userData: params.user
                }))
                .then(() => sigStatus(params.signature, "success"))
                .catch(reason => sigStatus(params.signature, "error", reason))
        ]))
        .then(sigEntry => {
            res = sigEntry;
            console.info('resultant signature entry', sigEntry);
            return setSigStatusInDb(sigEntry)
        })
        .then(() => sleep(100))
        .then(() => tc.close())
        .then(() => res);
}

interface ExecuteRunParams {
    run: RunEntry,
    user: UserEntry
}

export function executeRun(params: ExecuteRunParams): Promise<void> {
    const runCancelledPromise = runCancellationPromise(params.run.id);
    return getDatabaseManager().then(db => {
        const execSig = (signature: SignatureEntry) => {
            return Promise.all([
                db.getPetitionById(signature.petitionId)
            ]).then(([petition]) => signPetition({
                petition,
                signature,
                run: params.run,
                user: params.user
            }, runCancelledPromise));
        };
        // sign all signatures in order, short circuiting if the user cancels any petition
        return params.run.signatures
            .map(sig => () => execSig(sig))
            .reduce((p, fn) => p.then(() => Promise.race([
                runCancelledPromise.then(() => Promise.reject(`cancelled ${params.run.id}`)),
                fn().then(() => {})
            ])), Promise.resolve())
            .catch(err => {
                console.log(err);
                if (err !== `cancelled ${params.run.id}`)
                    throw err;
            });
    });
}
