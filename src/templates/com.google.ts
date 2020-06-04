import { run, getElementByXpath } from '../automation/inj';

run(async () => {
    let fName = "__FIRST_NAME__";
    let lName = "__LAST_NAME__";

    document.getElementById('body').style.backgroundColor = 'red';
    getElementByXpath("//input[@title='Search']")["value"] = `my name is ${fName} ${lName}`;
    await new Promise(r => setTimeout(r, 2000));
    return { success: true };
}, [/https?:\/\/.*.google.com/]);
