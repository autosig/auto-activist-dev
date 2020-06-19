export interface UserData {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    postalCode?: string;
    emailAddress?: string;
    stateAbbrev?: string;
    stateFull?: string;
    city?: string;
    streetAddress?: string;
}

export interface UserEntry extends UserData {
    id: string, // pk, random (or hash of data?)
}

export interface RunEntry {
    id: string, // pk, random
    userId: string,
    signatures: Array<SignatureEntry>
}

export type SignatureStatus = 'queued' | 'started' | 'success' | 'error' | 'cancelled';

export interface SignatureEntry {
    id: string, // pk, random
    petitionId: string,
    index: number,
    status: SignatureStatus,
    errReason?: string
}

export interface SiteEntry {
    domain: string, // pk
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
