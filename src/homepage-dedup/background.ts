import {browser, Runtime, Tabs} from "webextension-polyfill-ts";
import MessageSender = Runtime.MessageSender;
import {OpenHomepageRequest, OpenHomepageResponse} from "./messages";
import {Mutex, MutexInterface, Semaphore, SemaphoreInterface, withTimeout} from 'async-mutex';
import {router} from "../router";
import {TAB_ALIVE} from "../const-route-paths";

let activeHomepageId: number = -1;
const mutex = new Mutex();

function getHomepageTab(): Promise<Tabs.Tab> {
    if (activeHomepageId === undefined) {
        return Promise.reject('no homepage tab present');
    }
    return router.sendMessageToTab(activeHomepageId, TAB_ALIVE)
        .then(alive => {
            if (!alive)
                throw new Error('tab not alive');
        })
        .then(() => browser.tabs.get(activeHomepageId));
}

function switchToTab(tab: Tabs.Tab): Promise<Tabs.Tab> {
    return browser.tabs.update(tab.id,{
        active: true
    }).then(() => browser.windows.update(tab.windowId, {
        focused: true
    })).then(() => tab);
}

function openNewHomepageTab(): Promise<Tabs.Tab> {
    return browser.tabs.create({
        url: browser.runtime.getURL('/homepage.html')
    }).then(tab => {
        activeHomepageId = tab.id;
        return tab;
    });
}

export function handleOpenHomepage(_: OpenHomepageRequest, sender: MessageSender,
                                   closeCallerIfNotOnlyHomepage: boolean = false): Promise<OpenHomepageResponse> {
    return mutex.runExclusive(() =>
        getHomepageTab()
            .then(switchToTab)
            .catch(openNewHomepageTab)
            .then((activeHomepage: Tabs.Tab) => {
                if (closeCallerIfNotOnlyHomepage && sender.tab && sender.tab.id !== activeHomepage.id) {
                    return browser.tabs.remove(sender.tab.id).then(() => {});
                }
                return {};
            }));
}

export function handleAssertOnlyHomepage(_: OpenHomepageRequest, sender: MessageSender): Promise<OpenHomepageResponse> {
    return handleOpenHomepage(_, sender, true);
}
