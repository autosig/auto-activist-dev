import {TabController} from "../../tab-controller/tab-controller";
import {webBotReady} from "../../tab-controller/until";
import {assertNoCaptcha, PetitionScriptParams, PetitionScriptResult, sleep} from "../script-lib";

async function script(tc: TabController, p: PetitionScriptParams): Promise<PetitionScriptResult> {
    await tc.open(p.url);
    await tc.wait(webBotReady(), 10000);
    await tc.bot.type('id=id_first_name', p.userData.firstName);
    await tc.bot.type('id=id_last_name', p.userData.lastName);
    await tc.bot.type('id=id_email', p.userData.emailAddress);
    await tc.bot.type('id=id_zip', p.userData.postalCode);
    await tc.bot.click('id=id_action_video_no');
    await assertNoCaptcha(tc);
    return {
        success: true
    }
}

export default {
    script
};
