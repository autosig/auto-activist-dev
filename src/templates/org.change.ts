import {run, getElementByXpath, sleep, sendKeys, click, setCheckbox, clearAndSendKeys} from '../automation/inj';
import {UserData} from "../automation/templates";

const ud: UserData = {
    firstName: '{{firstName}}',
    lastName: '{{lastName}}',
    emailAddress: '{{emailAddress}}',
    city: '{{city}}',
    stateAbbrev: '{{stateAbbrev}}',
    postalCode: '{{postalCode}}'
};

run(async () => {
    await sleep(200);
    await sendKeys(document.getElementById('firstName'), ud.firstName);
    await sendKeys(document.getElementById('lastName'), ud.lastName);
    await sendKeys(document.getElementById('email'), ud.emailAddress);
    await click(getElementByXpath('//button[*//div[contains(@class, "symbol-edit")]]'));
    await sleep(100);
    await clearAndSendKeys(document.getElementById('city'), ud.city);
    await sendKeys(document.getElementById('stateCode'), ud.stateAbbrev);
    await clearAndSendKeys(document.getElementById('postalCode'), ud.postalCode);
    // await setCheckbox(document.getElementById('public'), 'false');
    await sleep(2000); // just for testing purposes
    return { success: true };
}, [/https?:\/\/.*.change.org\//]);
