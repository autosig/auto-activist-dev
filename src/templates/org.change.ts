import {run, getElementByXpath, sleep, sendKeys, click, setCheckbox, clearAndSendKeys} from '../automation/inj';

run(async () => {
    // await sleep(200);
    await sendKeys(document.getElementById('firstName'), "__FIRST_NAME__");
    await sendKeys(document.getElementById('lastName'), "__LAST_NAME__");
    await sendKeys(document.getElementById('email'), "__EMAIL__");
    await click(getElementByXpath('//button[*//div[contains(@class, "symbol-edit")]]'));
    await sleep(100);
    await clearAndSendKeys(document.getElementById('city'), "__CITY__");
    await sendKeys(document.getElementById('stateCode'), "__STATE_ABBREV__");
    await clearAndSendKeys(document.getElementById('postalCode'), "__POSTAL_CODE__");
    // await setCheckbox(document.getElementById('public'), 'false');
    await sleep(20000); // just for testing purposes
    return { success: true };
}, [/https?:\/\/.*.change.org\//]);

