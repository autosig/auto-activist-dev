import {run, sleep, sendKeys, click, setCheckbox, clearAndSendKeys} from '../automation/inj';
import {UserData} from "../automation/templates";

const ud: UserData = {
    firstName: '{{firstName}}',
    lastName: '{{lastName}}',
    emailAddress: '{{emailAddress}}',
};

run(async () => {
    await clearAndSendKeys(document.getElementById('Submissions_name'), `${ud.firstName} ${ud.lastName}`);
    await clearAndSendKeys(document.getElementById('Submissions_email'), ud.emailAddress);
    await setCheckbox(document.getElementById('Submissions_show_name'), 'false');
    await sleep(2000); // just for testing purposes
    return { success: true };
}, [/https?:\/\/.*.ipetitions.com\//]);
