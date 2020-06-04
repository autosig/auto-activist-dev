import {run, getElementByXpath, sendKeys, sleep} from '../automation/inj';

run(async () => {
    let fName = "__FIRST_NAME__";
    let lName = "__LAST_NAME__";

    document.getElementById('body').style.backgroundColor = 'red';
    await sendKeys(getElementByXpath("//input[@title='Search']"), `my name is ${fName} ${lName}`);
    await sleep(20000);
    return { success: true };
}, [/https?:\/\/.*.google.com/]);
