
export interface UserData {
    __FIRST_NAME__?: string,
    __LAST_NAME__?: string,
    __MIDDLE_NAME__?: string,
    __POSTAL_CODE__?: string,
    __EMAIL__?: string,
    __STATE_ABBREV__?: string,
    __CITY__?: string,
}

// todo: extract key names from the interface itself
const userDataKeys: Array<keyof UserData> = [
    '__FIRST_NAME__',
    '__LAST_NAME__',
    '__MIDDLE_NAME__',
    '__POSTAL_CODE__',
    '__EMAIL__',
    '__STATE_ABBREV__',
    '__CITY__'
];

async function readFileAsync(path: string): Promise<string> {
    return await fetch(chrome.runtime.getURL(path)).then(response => response.text());
}

export async function readTemplate(templateName: string, userData: UserData): Promise<string> {
    let template = await readFileAsync('/js/templates/' + templateName);

    let requiredKeys = userDataKeys.filter(k => template.includes(k));
    if (!requiredKeys.every(k => userData.hasOwnProperty(k)))
        return '';

    for (let i = 0; i < requiredKeys.length; i++) {
        let key = requiredKeys[i];
        template = template.replace(key, userData[key]);
    }

    return template;
}
