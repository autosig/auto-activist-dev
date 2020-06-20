import {TabController} from "../../tab-controller/tab-controller";
import {urlMatches, webBotReady} from "../../tab-controller/until";
import {assertNoCaptcha, PetitionScriptParams, PetitionScriptResult, sleep} from "../script-lib";

const stateSelectControl = '//div[@data-key="state"]//div[contains(@class, "selectize-control")]';

async function script(tc: TabController, p: PetitionScriptParams): Promise<PetitionScriptResult> {
    await tc.open(p.url);
    await tc.wait(webBotReady(), 10000);
    await tc.bot.type('id=sign_firstname', p.userData.firstName);
    await tc.bot.type('id=sign_lastname', p.userData.lastName);
    await tc.bot.type('id=sign_email', p.userData.emailAddress);
    await tc.bot.type('id=sign_address', p.userData.streetAddress);
    await tc.bot.type('id=sign_city', p.userData.city);
    await tc.bot.click('xpath=//div[@data-key="state"]');
    await tc.bot.type(`xpath=${stateSelectControl}//input`, [p.userData.stateFull]);
    await sleep(10);
    await tc.bot.click(`xpath=${stateSelectControl}//div[@data-selectable and contains(@class, "active")]`);
    await tc.bot.type('id=sign_zip', p.userData.postalCode);
    await tc.bot.setCheckbox('id=sign_anon', true);
    await assertNoCaptcha(tc);
    return {
        success: true
    }
}

export default {
    script
};
