import { TabResponseMessage } from './common';

/**
 * Opens a new tab and injects the
 * @param url The URL to open in the new tab
 * @param jsInject JavaScript code to inject to the new tab
 * @param callback
 * @param timeoutMs Timeout for tab to compete its task
 */
export function executeJs(
    url: string, jsInject: string, callback: (resp: TabResponseMessage) => void, timeoutMs: number = 10000) {

    chrome.tabs.create({ 'url': url, }, function (tab) {
        /* tab removal that can only be called once */
        let close = (res: TabResponseMessage) => {
            close = () => {};
            chrome.tabs.remove(tab.id);
            callback(res);
        };

        /* setup a callback for the new tab to trigger upon completion of its code */
        function onMessage(req, sender, res) {
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
}
