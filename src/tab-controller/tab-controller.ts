import {WebBot} from "../web-bot/web-bot";
import {webBotStub} from "../web-bot/stub";
import * as until from "./until";
import {browser, Tabs} from "webextension-polyfill-ts";
import {router} from "../router";
import {ControlledTabSettings, EVAL_SCRIPT_RUN, SET_CONTROLLED_TAB_SETTINGS} from "../const-route-paths";
import {pollUntil, UntilCondition} from "../util";

function setControlledTabSettings(settings: ControlledTabSettings): Promise<void> {
    return router.sendMessage(SET_CONTROLLED_TAB_SETTINGS, settings);
}

export class TabController {
    public bot: WebBot;
    private onCloseStack: Array<() => any> = [];
    private url: string;
    private static startingURL: string = browser.runtime.getURL('/start-automation.html');
    constructor(
        private tabId: number
    ) {
        this.url = TabController.startingURL;
        this.onCloseStack.push(() => this.removeTab());
        this.bot = webBotStub(tabId);
        this.setupOnUpdatedListener();
    }

    public static createTab(): Promise<TabController> {
        return browser.tabs.create({url: TabController.startingURL}).then(tab => {
            try {
                const tc = new TabController(tab.id);
                return setControlledTabSettings({tabId: tab.id}).then(() => tc);
            } catch (e) {
                console.log(e && e.message || e);
                return Promise.reject(e);
            }
        });
    }

    private tabExists(): Promise<boolean> {
        return browser.tabs.get(this.tabId)
            .then(() => true)
            .catch(() => false);
    }

    private performIfTabExists(cb): Promise<void> {
        return this.tabExists().then(exists => {
            console.log(exists);
            if (exists)
                return cb();
        })
    }

    private removeTab(): Promise<void> {
        console.log('removing tab if exists');
        return this.performIfTabExists(() => browser.tabs.remove(this.tabId));
    }

    public getTabId(): number {
        return this.tabId
    }

    public wait(untilCondition: UntilCondition, timeoutMs: number = 5000, pollIntervalMs: number = 25): Promise<void> {
        return pollUntil(untilCondition, timeoutMs, pollIntervalMs, this);
    }

    public open(url: string): Promise<void> {
        return browser.tabs.update(this.tabId, {url})
            .then(() => this.wait(until.tabReady()));
    }

    public setRunAtLoadScript(js: string): Promise<void> {
        return setControlledTabSettings({tabId: this.tabId, runAtLoadJs: js});
    }

    public getURL(): string {
        return this.url
    }

    public evalJs(js: string): Promise<any> {
        return router.sendMessageToTab(this.tabId, EVAL_SCRIPT_RUN, js);
    }

    private onUpdatedTab(tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab): void {
        if (tabId !== this.tabId)
            return;

        if (changeInfo.url) {
            this.url = changeInfo.url
        }
    }

    private setupOnUpdatedListener() {
        const listener = this.onUpdatedTab.bind(this);
        browser.tabs.onUpdated.addListener(listener);
        this.onCloseStack.push(() => {
            console.log('removing listener');
            return browser.tabs.onUpdated.removeListener(listener);
        });
    }

    public close(): Promise<void> {
        /* sequentially processes each of the closing callbacks */
        console.log('closing tab');
        return this.onCloseStack.reverse().reduce(
            (promise: Promise<void>, closeFn: () => Promise<void>) => promise.then(closeFn),
            Promise.resolve());
    }
}

