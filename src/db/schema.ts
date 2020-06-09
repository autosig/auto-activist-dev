import {UserData} from "../automation/templates";

export interface UserEntry extends UserData {
    id: string, // pk, random (or hash of data?)
    timeAdded: Date
}

export interface RunEntry {
    id: string, // pk, random
    userId: string,
    signatures: Array<SignatureEntry>
}

export interface SignatureEntry {
    id: string, // pk, random
    petitionId: string,
    index: number,
    status: 'queued' | 'started' | 'success' | 'error' | 'cancelled',
    errReason?: string
}

export interface SiteEntry {
    domain: string, // pk
    grantedUserData: Array<string>,
    automationHandler: string,
}

export interface PetitionEntry {
    id: string, // pk
    title: string,
    description: string,
    siteDomain: string,
    url: string,
}

export interface CategoryEntry {
    id: string, // pk
    title: string,
    description: string,
    petitions: Array<PetitionEntry>
}

export interface CauseEntry {
    id: string, // pk
    title: string,
    categories: Array<CategoryEntry>;
}

export interface PetitionTable {
    causes: Array<CauseEntry>
}
export interface UserTable {
    users: Array<UserEntry>
}
export interface SiteTable {
    sites: Array<SiteEntry>
}
export interface RunTable {
    runs: Array<RunEntry>
}
