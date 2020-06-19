import {stubbify} from '../stub';
import {WebBot} from "./web-bot";
import {router} from "../router";
import {WEB_BOT_CMD} from "../const-route-paths";


export function webBotStub(tabId: number): WebBot {
    const webBot = WebBot.createDummy();
    stubbify(req => router.sendMessageToTab(tabId, WEB_BOT_CMD, req), webBot);
    return webBot;
}
