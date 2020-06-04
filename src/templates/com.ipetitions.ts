import {run, sleep, sendKeys, click, setCheckbox, clearAndSendKeys} from '../automation/inj';

run(async () => {
    await clearAndSendKeys(document.getElementById('Submissions_name'), "__FIRST_NAME__ __LAST_NAME__");
    await clearAndSendKeys(document.getElementById('Submissions_email'), "__EMAIL__");
    await setCheckbox(document.getElementById('Submissions_show_name'), 'false');
    await sleep(100); // just for testing purposes
    return { success: true };
}, [/https?:\/\/.*.ipetitions.com\//]);

