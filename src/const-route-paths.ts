
export const GET_CONTROLLED_TAB_SETTINGS = '/bg/get-controlled-tab-settings';
export const SET_CONTROLLED_TAB_SETTINGS = '/bg/set-controlled-tab-settings';
export interface ControlledTabSettings {
    tabId: number,
    runAtLoadJs?: string
}

export const OPEN_HOMEPAGE = '/bg/homepage-dedup/open-homepage';
export const ASSERT_ONLY_HOMEPAGE = '/bg/homepage-dedup/assert-only-homepage';

export const TAB_ALIVE = '/any/tab-alive';

export const EVAL_SCRIPT_RUN = '/cs/eval-script/eval';

export const WEB_BOT_READY = '/cs/web-bot/ready';
export const WEB_BOT_CMD = '/cs/web-bot/cmd';

export const TAB_READY = '/cs/ready';
