
type TabResponse = {
    success: Boolean,
    err: string
}


/**
 * Opens a new tab and injects the
 * @param url The URL to open in the new tab
 * @param jsInject JavaScript code to inject to the new tab
 * @param callback
 * @param timeoutMs Timeout for tab to compete its task
 */
export function executeJs(
    url: string, jsInject: string, callback: (resp: TabResponse) => void, timeoutMs: number = 10000) {

    chrome.tabs.create({ 'url': url, }, function (tab) {
        /* tab removal that can only be called once */
        let removeTab = () => {
            removeTab = () => {};
            chrome.tabs.remove(tab.id);
        };

        /* setup a callback for the new tab to trigger upon completion of its code */
        function onMessage(req, sender, res) {
            if (sender.tab.id !== tab.id)
                return;
            console.log("received request from tab: " + req);
            chrome.runtime.onMessage.removeListener(onMessage);
            removeTab();
            callback(req); // provide the tab's message back to the caller
        }
        chrome.runtime.onMessage.addListener(onMessage);

        /* inject the js file */
        chrome.tabs.executeScript(tab.id, {file: jsInject}, function() {
            /* after the script is done loading and finished synchronous execution, start a timeout */
            setTimeout(() => {
                removeTab();
                callback({ success: false, err: 'timeout' });
                console.log('experienced timeout...')
            }, timeoutMs);
        });
    });
}
