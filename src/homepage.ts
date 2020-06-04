import * as $ from 'jquery';
import { executeJs } from './automation/ext';
import {readTemplate, UserData } from './automation/templates';

console.log('hello!');

const userData: UserData = {
    __FIRST_NAME__: 'Alexander',
    __MIDDLE_NAME__: 'Burr',
    __LAST_NAME__: 'Hamilton',
    __EMAIL__: 'aham@aham.com',
    __POSTAL_CODE__: '00631',
    __STATE_ABBREV__: 'CA',
    __CITY__: 'North Pole'

};
const template = 'org.change.js';
const url = 'https://www.change.org/p/we-demand-all-us-states-are-immediately-provided-functional-coronavirus-testing-kits';

$(function () {
    $('#start').on('click', () => {
        readTemplate(template, userData).then(js => {
            executeJs(url, js, function (res) {
                console.log("tab's response: ", res);
            });
        });
    });
});
