
type TabRetVal = {
    success: boolean,
    err?: string
}

export async function run(main: () => Promise<TabRetVal>, acceptableUrlRegexps?: [RegExp]) {
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
