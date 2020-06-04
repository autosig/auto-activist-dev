import { TabResponseMessage } from './common';
import Tab = chrome.tabs.Tab;

/**
 * Opens a new tab and injects the
 * @param url The URL to open in the new tab
 * @param jsInject JavaScript code to inject to the new tab
 * @param callback
 * @param timeoutMs Timeout for tab to compete its task
 */
export function executeJs(
    url: string, jsInject: string, timeoutMs: number = 10000): Promise<TabResponseMessage> {
    return new Promise<TabResponseMessage>((resolve, reject) => {
        chrome.tabs.create({ 'url': url, }, function (tab) {
            /* tab removal that can only be called once */
            let close: (res: TabResponseMessage) => void = (res: TabResponseMessage) => {
                close = (_: TabResponseMessage) => { };
                chrome.tabs.remove(tab.id);
                /* translate the response object to a callback */
                if (res.success === true) {
                    resolve(res);
                } else {
                    reject(res.err);
                }
            };

            /* setup a callback for the new tab to trigger upon completion of its code */
            function onMessage(req, sender, _) {
                if (sender.tab.id !== tab.id)
                    return;
                console.log("received request from tab: " + req);
                chrome.runtime.onMessage.removeListener(onMessage);
                close(req); // provide the tab's message back to the caller
            }
            chrome.runtime.onMessage.addListener(onMessage);

            /* inject the js file */
            chrome.tabs.executeScript(tab.id, {code: jsInject}, function() {
                /* after the script is done loading and finished synchronous execution, start a timeout */
                setTimeout(() => {
                    close({ success: false, err: 'timeout' });
                }, timeoutMs);
            });
        });
    });
}
