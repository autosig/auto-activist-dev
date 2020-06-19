import {browser, Runtime} from "webextension-polyfill-ts";

import MessageSender = Runtime.MessageSender;

export type Channel = (payload: any) => Promise<any>;

export type MessageHandler = (req: any, sender: MessageSender) => (Promise<any> | any | void);

/**  Promise based router for messages between parts of the extension. */
export class Router {
    private readonly routes: Map<string, MessageHandler>;

    public constructor() {
        this.routes = new Map<string, MessageHandler>();
        this.open();
    }

    public addRoute(path: string, handler: MessageHandler) {
        this.routes.set(path, (...args) => Promise.resolve(handler(...args)));
    }

    public removeRoute(path: string) {
        if (!this.routes.has(path))
            this.routes.delete(path);
    }

    public sendMessage(path: string, payload: any = {}): Promise<any> {
        return browser.runtime.sendMessage({
            path,
            payload
        });
    }

    public sendMessageToTab(tabId: number, path: string, payload: any = {}): Promise<any> {
        console.debug('sendMessageToTab(' + tabId + ', ' + path + ', ', payload);
        return browser.tabs.sendMessage(tabId, {
            path,
            payload
        });
    }

    public handleMessage: MessageHandler = (req, ...args) => {
        console.debug('received message in router', req);
        const { path, payload } = req;
        if (!this.routes.has(path))
            return;
        return this.routes.get(path)(payload, ...args);
    };

    public channel(path: string): (payload: any) => Promise<any> {
        return (payload: any) => this.sendMessage(path, payload);
    }


    public close(): void {
        browser.runtime.onMessage.removeListener(this.handleMessage);
    }

    public open(): void {
        browser.runtime.onMessage.addListener(this.handleMessage);
    }
}

declare global {
    interface Window { _router: Router; }
}

window._router = window._router || new Router();
export const router = window._router;
