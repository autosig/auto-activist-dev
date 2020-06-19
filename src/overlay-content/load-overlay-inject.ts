import {loadExtensionResource} from "../util";
import * as Mustache from 'mustache';
import {PetitionEntry} from "../db/schema";

// nothing in this should be user input -- either random or inputted by us
export interface OverlayInjectSettings {
    overlayInjectId: string,
    runId: string,
    petitionEntry: PetitionEntry
}

export function loadOverlayInjectJs(settings: OverlayInjectSettings): Promise<string> {
    console.debug('injected script settings', settings);
    return loadExtensionResource('js/overlay.js').then(t => Mustache.render(t, settings));
}
