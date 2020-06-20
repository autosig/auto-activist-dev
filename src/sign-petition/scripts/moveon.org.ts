import {TabController} from "../../tab-controller/tab-controller";
import {urlMatches, webBotReady} from "../../tab-controller/until";
import {assertNoCaptcha, PetitionScriptParams, PetitionScriptResult, sleep} from "../script-lib";

async function script(tc: TabController, p: PetitionScriptParams): Promise<PetitionScriptResult> {
    await tc.open(p.url);
    await tc.wait(webBotReady(), 10000);
    await tc.bot.type('id=signature_first_name', p.userData.firstName);
    await tc.bot.type('id=signature_last_name', p.userData.lastName);
    await tc.bot.type('id=signature_email', p.userData.emailAddress);
    await tc.bot.type('id=signature_postcode', p.userData.postalCode);
    return {
        success: true
    }
}

export default {
    script
};
