import * as $ from 'jquery';
import { executeJs } from './automation/ext';

console.log('hello!');

$(function() {
    $('#start').on('click', () => {
        console.log('goodbye!');

        executeJs('https://google.com', '/js/templates/com.google.js', function (res) {
            console.log("inside openTab callback: ", res);
        });
    });
});
