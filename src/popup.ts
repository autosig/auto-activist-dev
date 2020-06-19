import {router} from "./router";
import {OPEN_HOMEPAGE} from "./const-route-paths";

(async () => {
    // closes the current tab if it is not the only homepage and switches to the already open homepage tab
    await router.sendMessage(OPEN_HOMEPAGE);
})();

