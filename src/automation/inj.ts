import { TabResponseMessage } from './common';
import * as Simulate from 'simulate';

const OVERLAY_ID = 'autoActivistOverlayID';

export async function run(main: () => Promise<TabResponseMessage>, acceptableUrlRegexps?: [RegExp]) {
    let currentURL = window.location.href;
    // if (acceptableUrlRegexps !== null && !matchRegexArray(currentURL, acceptableUrlRegexps)) {
    //     sendFailure('Current URL ' + currentURL + ' does not match any of ' + acceptableUrlRegexps);
    //     return;
    // }
    setupBodyWrapper();
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
    // todo: add check after sending keys to ensure that the element contains exactly `text`
    await deleteText(elem);
    await sendKeys(elem, text);
}

export async function deleteText(elem) {
    elem.focus();
    let text = elem.value;
    const chars = text.split('');
    await chars.forEach(_ => sendKey(elem, String.fromCharCode(127)));
    await sendKey(elem, ' ');
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

function setupBodyWrapper() {
    let overlay = document.createElement('div');
    overlay.style.backgroundColor = 'green';
    overlay.style.opacity = '90%';
    overlay.style.position = 'fixed';
    overlay.style.zIndex = '1000';
    overlay.style.height = overlay.style.width = '100%';
    overlay.style.top = overlay.style.right = overlay.style.left = overlay.style.bottom = '0';
    overlay.style.pointerEvents = 'none';
    overlay.style.cursor = 'none';
    overlay.setAttribute('id', OVERLAY_ID);

    let text = document.createElement('p');
    text.innerText = 'Auto-Activist!';
    text.style.fontSize = '5em';
    text.style.color = 'white';
    text.style.position = 'relative';
    text.style.top = text.style.left = '50%';
    // text.style.justifyContent = 'center';

    overlay.appendChild(text);
    document.body.appendChild(overlay);
}
