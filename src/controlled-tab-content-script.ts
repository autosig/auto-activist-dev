import {router} from "./router";
import {stubDispatch} from "./stub";
import {WebBot} from "./web-bot/web-bot";
import {
    TAB_READY,
    EVAL_SCRIPT_RUN,
    WEB_BOT_CMD,
    GET_CONTROLLED_TAB_SETTINGS,
    WEB_BOT_READY, ControlledTabSettings
} from "./const-route-paths";



(async () => {
    const settings: ControlledTabSettings = await router.sendMessage(GET_CONTROLLED_TAB_SETTINGS);
    if (!settings)
        return;
    console.log('settings', settings);

    if (settings.runAtLoadJs)
        (new Function(settings.runAtLoadJs))();
    // TODO: is it safe to start automation after DOMContentLoaded? (vs window.onload)
    document.addEventListener('DOMContentLoaded', async () => {
        const webBot = await WebBot.create();
        console.log(webBot);
        router.addRoute(WEB_BOT_CMD, req => Promise.resolve(stubDispatch(req, webBot)));
        router.addRoute(WEB_BOT_READY, () => Promise.resolve(webBot.webBotReady()));
    });

    router.addRoute(EVAL_SCRIPT_RUN, (js: string) => Promise.resolve(eval(js)));

    // all other routes have been set up
    router.addRoute(TAB_READY, () => Promise.resolve(true));
})();

