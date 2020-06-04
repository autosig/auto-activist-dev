import {run, getElementByXpath, sendKeys, sleep} from '../automation/inj';
import {UserData} from "../automation/templates";

const ud: UserData = {
    firstName: '{{firstName}}',
    lastName: '{{lastName}}',
};

run(async () => {
    document.getElementById('body').style.backgroundColor = 'red';
    await sendKeys(getElementByXpath("//input[@title='Search']"), `my name is ${ud.firstName} ${ud.lastName}`);
    await sleep(2000);
    return { success: true };
}, [/https?:\/\/.*.google.com/]);
