import {router} from "./router";
import {handleAssertOnlyHomepage, handleOpenHomepage} from "./homepage-dedup/background";
import {Runtime} from "webextension-polyfill-ts";
import MessageSender = Runtime.MessageSender;
import {
    ASSERT_ONLY_HOMEPAGE,
    ControlledTabSettings,
    GET_CONTROLLED_TAB_SETTINGS,
    OPEN_HOMEPAGE,
    SET_CONTROLLED_TAB_SETTINGS
} from "./const-route-paths";

router.addRoute(OPEN_HOMEPAGE, handleOpenHomepage);
router.addRoute(ASSERT_ONLY_HOMEPAGE, handleAssertOnlyHomepage);

const controlledTabs = new Map<number, ControlledTabSettings>();
router.addRoute(SET_CONTROLLED_TAB_SETTINGS, (req: ControlledTabSettings, _) => { controlledTabs.set(req.tabId, req) });
router.addRoute(GET_CONTROLLED_TAB_SETTINGS, (_: any, sender: MessageSender) =>
    Promise.resolve(controlledTabs.has(sender.tab.id) && controlledTabs.get(sender.tab.id)));

