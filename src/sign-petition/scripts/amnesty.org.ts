import {TabController} from "../../tab-controller/tab-controller";
import {webBotReady} from "../../tab-controller/until";
import {assertNoCaptcha, PetitionScriptParams, PetitionScriptResult, sleep} from "../script-lib";

async function script(tc: TabController, p: PetitionScriptParams): Promise<PetitionScriptResult> {
    await tc.open(p.url);
    await tc.wait(webBotReady(), 10000);
    await tc.bot.type('xpath=//input[contains(@id, "firstName")]', p.userData.firstName);
    await tc.bot.type('xpath=//input[contains(@id, "lastName")]', p.userData.lastName);
    await tc.bot.type('xpath=//input[contains(@id, "emailAddress")]', p.userData.emailAddress);
    await tc.bot.setAttribute('xpath=//select[contains(@id, "country")]', 'value', 'US');
    await assertNoCaptcha(tc);
    return {
        success: true
    }
}

export default {
    script
};
