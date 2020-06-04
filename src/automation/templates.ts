import * as Mustache from 'mustache';

export interface UserData {
    firstName?: string,
    lastName?: string,
    middleName?: string,
    postalCode?: string,
    emailAddress?: string,
    stateAbbrev?: string,
    city?: string,
}

async function readFileAsync(path: string): Promise<string> {
    return await fetch(chrome.runtime.getURL(path)).then(response => response.text());
}

export async function readTemplate(templateName: string, userData: UserData): Promise<string> {
    let template = await readFileAsync('/js/templates/' + templateName);
    return Mustache.render(template, userData);
}
