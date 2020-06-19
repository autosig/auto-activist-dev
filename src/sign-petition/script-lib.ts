import {UserData} from "../db/schema";
import {TabController} from "../tab-controller/tab-controller";

export interface PetitionScriptResult {
    success: boolean
}

export interface PetitionScriptParams {
    userData: UserData,
    url: string
}

export interface PetitionScript {
    script: (tc: TabController, p: PetitionScriptParams) => Promise<PetitionScriptResult>
}

export async function hasCaptcha(tc: TabController): Promise<boolean> {
    const captchaFrameLocator = '//iframe[contains(@src, "recaptcha")]';
    return tc.bot.elementExists(captchaFrameLocator);
}

export async function assertNoCaptcha(tc: TabController): Promise<void> {
    if (await hasCaptcha(tc))
        throw new Error("recaptcha")
}

export function sleep(ms: number): Promise<void> {
    return new Promise<void>(res => setTimeout(res, ms));
}

export async function logError(fn: () => Promise<void>): Promise<void> {
    try {
        await fn();
    } catch (e) {
        console.debug('inside logError', e);
    }
}
