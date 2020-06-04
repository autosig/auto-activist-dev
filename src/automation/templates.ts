
export enum UserDataFields {
    udFirstName = '__FIRST_NAME__',
    udLastName = '__LAST_NAME__',
    udMiddleName = '__MIDDLE_NAME__',
    udZipCode = '__ZIP_CODE__',
}

export type UserData = {
    __FIRST_NAME__?: string,
    __LAST_NAME__?: string,
    __MIDDLE_NAME__?: string,
    __ZIP_CODE__?: string
}

async function readFileAsync(path: string): Promise<string> {
    return await fetch(chrome.runtime.getURL(path)).then(response => response.text());
}

export async function readTemplate(templateName: string, userData: UserData): Promise<string> {
    let template = await readFileAsync('/js/templates/' + templateName);

    let possibleUserDataKeys = Object.keys(UserDataFields).map(k => UserDataFields[k]);
    let requiredKeys = possibleUserDataKeys.filter(k => template.includes(k));

    if (!requiredKeys.every(k => userData.hasOwnProperty(k)))
        return '';

    for (let i = 0; i < requiredKeys.length; i++) {
        let key = requiredKeys[i];
        template = template.replace(key, userData[key]);
    }

    return template;
}
