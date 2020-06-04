import { TabResponseMessage } from './common';
import * as Simulate from 'simulate';

export async function run(main: () => Promise<TabResponseMessage>, acceptableUrlRegexps?: [RegExp]) {
    let currentURL = window.location.href;
    // if (acceptableUrlRegexps !== null && !matchRegexArray(currentURL, acceptableUrlRegexps)) {
    //     sendFailure('Current URL ' + currentURL + ' does not match any of ' + acceptableUrlRegexps);
    //     return;
    // }
    let result = await main();
    chrome.runtime.sendMessage(result);
}

export function sendSuccess(): void {
    chrome.runtime.sendMessage({
        'success': true
    })
}

export function sendFailure(err: string): void {
    chrome.runtime.sendMessage({
        'success': false,
        'err': err
    })
}

function matchRegexArray(str: string, regexArray: [RegExp]): Boolean {
    for (let i = 0; i < regexArray.length; i++) {
        let regex = regexArray[i];
        if (str.search(regex) !== -1)
            return true;
    }
    return false;
}

export function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

export function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function sendKey(elem, chr) {
    Simulate.keydown(elem, chr);
    await sleep(5);
    Simulate.keypress(elem, chr);
    await sleep(6);
    Simulate.input(elem, chr);
    if (chr.charCodeAt(0) === 127) {
        elem.value = elem.value.substring(0, elem.value.length - 1);
    } else {
        elem.value += chr;
    }
    await sleep(7);
    Simulate.keyup(elem, chr);
    await sleep(8);
}

export async function sendKeys(elem, text) {
    elem.focus();
    console.log(text);
    const chars = text.split('');
    await chars.forEach(chr => sendKey(elem, chr));
    await sendKey(elem, ' ');
}

export async function clearAndSendKeys(elem, text) {
    await deleteText(elem);
    await sendKeys(elem, text);
}

export async function deleteText(elem) {
    elem.focus();
    let text = elem.value;
    const chars = text.split('');
    await chars.forEach(_ => sendKey(elem, String.fromCharCode(127)));
    sendKey(elem, ' ');
}

export async function click(elem) {
    // elem.mouseover();
    // elem.mousedown();
    await sleep(5);
    elem.click();
    await sleep(5);
    // elem.mouseup();
    // elem.mouseout();
}

export async function setCheckbox(elem, status: 'true' | 'false') {
    elem.click();
    elem['value'] = 'false';
    elem['checked'] = false;
}
