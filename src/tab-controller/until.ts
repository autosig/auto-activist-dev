import {router} from "../router";
import {TAB_READY, WEB_BOT_READY} from "../const-route-paths";
import {UntilCondition} from "../util";

export function webBotReady(): UntilCondition {
    return {
        test: tc => router.sendMessageToTab(tc.getTabId(), WEB_BOT_READY),
        description: 'webBotReady'
    }
}

export function tabReady(): UntilCondition {
    return {
        test: tc => router.sendMessageToTab(tc.getTabId(), TAB_READY),
        description: 'tabReady'
    }
}

export function urlIsExactly(url: string): UntilCondition {
    return {
        test: tc => url === tc.getURL(),
        description: 'url exactly matches ' + url
    }
}

export function urlMatches(urlPattern: RegExp): UntilCondition {
    return {
        test: tc => urlPattern.test(tc.getURL()),
        description: 'url matches regex ' + urlPattern
    }
}

