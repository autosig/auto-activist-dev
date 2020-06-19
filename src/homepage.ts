import {router} from "./router";
import {browser} from "webextension-polyfill-ts";
import {TabController} from "./tab-controller/tab-controller";
import * as until from "./tab-controller/until";
import {ASSERT_ONLY_HOMEPAGE, TAB_ALIVE} from "./const-route-paths";
import {loadExtensionResource} from "./util";
import {loadOverlayInjectJs} from "./overlay-content/load-overlay-inject";
import {uuid} from "uuidv4";
import {executeRun, signPetition} from "./sign-petition";
import {getDatabaseManager} from "./db";

(async () => {
    // closes the current tab if it is not the only homepage and switches to the already open homepage tab
    router.addRoute(TAB_ALIVE, () => Promise.resolve(true));
    await router.sendMessage(ASSERT_ONLY_HOMEPAGE);
})();

document.getElementById('start').onclick = async () => {
    const db = await getDatabaseManager();
    const user = (await db.getUsers())[0];
    const run = (await db.getRunsByUser(user.id))[1];
    await executeRun({
        run,
        user
    }).catch(console.log);
};
