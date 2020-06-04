import * as $ from 'jquery';
import { executeJs } from './automation/ext';
import {readTemplate, UserData } from './automation/templates';
import read = chrome.socket.read;
import {sleep} from "./automation/inj";
import {TabResponseMessage} from "./automation/common";

console.log('hello!');

const userData: UserData = {
    firstName: 'Alexander',
    middleName: 'Burr',
    lastName: 'Hamilton',
    emailAddress: 'aham@aham.com',
    postalCode: '00631',
    stateAbbrev: 'CA',
    city: 'North Pole'

};
const template = 'org.change.js';
const url = 'https://www.change.org/p/we-demand-all-us-states-are-immediately-provided-functional-coronavirus-testing-kits';

function executeTemplate(templatePath: string, userData: UserData, url: string): Promise<TabResponseMessage> {
    return readTemplate(templatePath, userData).then(js => {
        return executeJs(url, js);
    });
}

$(function () {
    $('#start').on('click', async () => {
        const start = new Date().getTime();
        await executeTemplate(template, userData, url);
        await executeTemplate('com.ipetitions.js', userData, 'https://www.ipetitions.com/petition/ct-gov-restore-our-voter-rights/?utm_source=wix&utm_medium=landing&utm_campaign=covid19');
        const end = new Date().getTime();
        console.log(`It took ${end - start}.`);
    });
});
