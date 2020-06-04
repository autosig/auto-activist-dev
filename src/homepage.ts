import * as $ from 'jquery';
import { executeJs } from './automation/ext';
import { readTemplate } from './automation/templates';

console.log('hello!');

$(function() {
    $('#start').on('click', () => {
        console.log('goodbye!');

        let jsPromise = readTemplate('com.google.js', {
            __FIRST_NAME__: 'Alexander',
            __LAST_NAME__: 'Hamilton',
            __MIDDLE_NAME__: 'Burr',
            __ZIP_CODE__: '06511'
        });

        jsPromise.then(js => {
            executeJs('https://google.com', js, function (res) {
                console.log("inside openTab callback: ", res);
            });
        });
    });
});
