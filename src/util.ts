import {browser} from "webextension-polyfill-ts";

export interface UntilCondition {
    test: (...args: any[]) => (boolean | Promise<boolean>),
    description?: string
}

function waitPromise(ms: number): Promise<void> {
    return new Promise<void>(res => {
        setTimeout(res, ms);
    })
}

export function pollUntil(untilCondition: UntilCondition,
                          timeoutMs: number = 5000,
                          pollIntervalMs: number = 25,
                          ...args: any[]): Promise<void> {
    const currMs = () => new Date().getTime();
    const endMs = currMs() + timeoutMs;
    const testCondition = () => Promise.resolve(untilCondition.test(...args))
        .catch(reason => {
            console.debug('pollUntil testing ' + untilCondition.description + ' caught', reason);
            return false;
        });
    const handleTestResult = (isSatisfied: boolean): Promise<void> => {
        if (isSatisfied) {
            return;
        } else if (currMs() > endMs) {
            return Promise.reject('timeout after ' + timeoutMs + ' awaiting ' + untilCondition.description);
        } else {
            return waitPromise(pollIntervalMs).then(testCondition).then(handleTestResult)
        }
    };
    return testCondition().then(handleTestResult);
}

export function loadExtensionResource(url: string): Promise<string> {
    if (!url.startsWith('chrome-extension://')) {
        url = browser.runtime.getURL(url);
    }
    return fetch(url).then(resp => resp.text());
}
