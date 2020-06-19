import {TabController} from "../../tab-controller/tab-controller";
import {webBotReady} from "../../tab-controller/until";
import {assertNoCaptcha, logError, PetitionScriptParams, PetitionScriptResult} from "../script-lib";

const editInfoIconLocator = 'xpath=//form//button[@type="button"]';
const signThisPetitionMobileStart = 'xpath=//button[descendant::text()="Sign this petition" and not(@type = "submit")]';

async function script(tc: TabController, p: PetitionScriptParams): Promise<PetitionScriptResult> {
    await tc.open(p.url);
    await tc.wait(webBotReady(), 10000);
    await logError(async () => await tc.bot.click(signThisPetitionMobileStart));
    if (await tc.bot.elementExists(editInfoIconLocator)) {
        await tc.bot.click(editInfoIconLocator);
    }
    await tc.bot.type('id=firstName', p.userData.firstName);
    await tc.bot.type('id=lastName', p.userData.lastName);
    await tc.bot.type('id=email', p.userData.emailAddress);
    await tc.bot.clear('id=city');
    await tc.bot.type('id=city', p.userData.city);
    await tc.bot.type('id=stateCode', p.userData.stateAbbrev);
    await tc.bot.clear('id=postalCode');
    await tc.bot.type('id=postalCode', p.userData.postalCode);
    await tc.bot.setCheckbox('id=public', false);
    await assertNoCaptcha(tc);
    return {
        success: true
    }
}

export default {
    script
};
