import {router} from "./router";
import {ASSERT_ONLY_HOMEPAGE, TAB_ALIVE} from "./const-route-paths";
import {executeRun} from "./sign-petition";
import {getDatabaseManager} from "./db";
// @ts-ignore
import html from "./homepage/template.html";
import * as Mustache from 'mustache';
import {RunEntry, SignatureEntry, UserData, UserEntry} from "./db/schema";
import {uuid} from "uuidv4";


(async () => {
    // closes the current tab if it is not the only homepage and switches to the already open homepage tab
    router.addRoute(TAB_ALIVE, () => Promise.resolve(true));
    await router.sendMessage(ASSERT_ONLY_HOMEPAGE);
})();

const userFields: Array<{id: keyof UserData, label: string}> = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name"},
    { id: "emailAddress", label: "Email Address" },
    { id: "postalCode", label: "Zip Code" },
    { id: "stateAbbrev", label: "State Code" },
    { id: "stateFull", label: "State" },
    { id: "city", label: "City" },
    { id: "streetAddress", label: "Street Address" }
];

function submitUserEntry(): Promise<UserEntry> {
    let userData: UserData = {};
    userFields.forEach(({id}) => userData[id] = document.getElementById(id)['value']);
    return getDatabaseManager().then(db => db.addUser(userData));
}

function submitRunEntry(userId: string): Promise<RunEntry> {
    const inputs = document.getElementById('petition-checkboxes').getElementsByTagName("input");
    const petitionIds = Array.from(inputs).filter(e => e.checked === true).map(e => e.id);
    return getDatabaseManager().then(db => db.createRunEntry(petitionIds, userId));
}

function successPage(runId: string) {
    // getDatabaseManager()
    //     .then(db => db.getRunById(runId))
    //     .then(runEntry => {
    //         const successes = runEntry.signatures.filter()
    //     })
}


window.onload = async () => {
    const content = document.createElement('div');
    const db = await getDatabaseManager();
    const cause = (await db.getCauseById('cause/black-lives-matter'));
    content.innerHTML = Mustache.render(html, {
        categories: cause.categories,
        userFields,
    });
    document.body.appendChild(content);

    let user: UserEntry;
    let run: RunEntry;

    document.getElementById('submit-user-data').onclick = async (e) => {
        e.preventDefault();
        console.log('submit user data');
        user = await submitUserEntry();
        console.log(user);
    };

    document.getElementById('run').onclick = async (e) => {
        e.preventDefault();
        console.log('submit petition selection');
        if (!user)
            return;
        run = await submitRunEntry(user.id);
        await executeRun({
            run,
            user
        })
            .then(() => successPage(run.id))
            .catch(console.log);
    };
};
