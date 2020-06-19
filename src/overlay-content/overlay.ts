// @ts-ignore
import overlayHTML from './overlay.html';
import {uuid} from "uuidv4";
import {cancelRun} from "./cancel";

const runId = '{{{runId}}}';

const OVERLAY_DIV_ID = 'autosigOverlay-' + uuid();

function onBodyLoad(cb) {
    /** https://stackoverflow.com/questions/26324624/wait-for-document-body-existence/26324641#26324641 */
    (function() {
        "use strict";
        var observer = new MutationObserver(function() {
            if (document.body) {
                observer.disconnect();
                cb();
            }
        });
        observer.observe(document.documentElement, {childList: true});
    })();
}

function injectOverlay() {
    const overlayElem = document.createElement('div');
    overlayElem.id = OVERLAY_DIV_ID;
    overlayElem.innerHTML = overlayHTML;
    document.body.appendChild(overlayElem);
}

(async () => {
    onBodyLoad(() => {
        injectOverlay();
        document.getElementById('autosig-cancel').onclick = () => {
            cancelRun(runId);
        };
    });
})();
