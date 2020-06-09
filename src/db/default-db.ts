import {PetitionTable, RunTable, SiteTable, UserTable} from "./schema";

export const sites: SiteTable = {
    sites: [
        {
            domain: "change.org",
            grantedUserData: ["firstName", "lastName", "emailAddress"],
            automationHandler: "change_org"
        },
        {
            domain: "thepetitionsite.com",
            grantedUserData: [],
            automationHandler: "thepetitionsite_com"
        },
        {
            domain: "amnesty.org",
            grantedUserData: [],
            automationHandler: "amnesty_org"
        },
        {
            domain: "act.colorofchange.org",
            grantedUserData: [],
            automationHandler: "colorofchange_org"
        },
        {
            domain: "moveon.org",
            grantedUserData: [],
            automationHandler: "moveon_org"
        },
        {
            domain: "justiceforbreonna.org",
            grantedUserData: [],
            automationHandler: "justiceforbreonna_org"
        }
    ]
};

export const petitions: PetitionTable = {
    causes: [
        {
            id: "cause/black-lives-matter",
            title: "Black Lives Matter",
            categories: [
                {
                    id: "category/justice-for-george-floyd",
                    title: "Justice For George Floyd",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula.",
                    petitions: [
                        {
                            url: "https://www.change.org/p/mayor-jacob-frey-justice-for-george-floyd",
                            siteDomain: "change.org",
                            id: "petition/https://www.change.org/p/mayor-jacob-frey-justice-for-george-floyd",
                            title: "Justice for George Floyd",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://www.change.org/p/mayor-jacob-frey-justice-for-george-floyd-2",
                            siteDomain: "change.org",
                            id: "petition/https://www.change.org/p/mayor-jacob-frey-justice-for-george-floyd-2",
                            title: "JUSTICE FOR GEORGE FLOYD",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://www.change.org/p/change-org-the-minneapolis-police-officers-to-be-charged-for-murder-after-killing-innocent-black-man",
                            siteDomain: "change.org",
                            id: "petition/https://www.change.org/p/change-org-the-minneapolis-police-officers-to-be-charged-for-murder-after-killing-innocent-black-man",
                            title: "The Minneapolis Police Officers to be charged for murder after killing innocent black man",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://www.thepetitionsite.com/248/031/510/justice-for-george-floyd-another-black-man-needlessly-murdered-by-police",
                            siteDomain: "thepetitionsite.com",
                            id: "petition/https://www.thepetitionsite.com/248/031/510/justice-for-george-floyd-another-black-man-needlessly-murdered-by-police",
                            title: "Justice for George Floyd, Another Black Man Needlessly Murdered by Police",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://www.amnesty.org/en/get-involved/take-action/george-floyd-police-violence-usa",
                            siteDomain: "amnesty.org",
                            id: "petition/https://www.amnesty.org/en/get-involved/take-action/george-floyd-police-violence-usa",
                            title: "Demand justice for George Floyd",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://act.colorofchange.org/sign/justiceforfloyd_george_floyd_minneapolis",
                            siteDomain: "colorofchange.org",
                            id: "petition/https://act.colorofchange.org/sign/justiceforfloyd_george_floyd_minneapolis",
                            title: "#JusticeforFloyd: Demand the officers who killed George Floyd are charged with murder.",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://act.colorofchange.org/sign/justiceforfloyd_george_floyd_minneapolis",
                            siteDomain: "colorofchange.org",
                            id: "petition/https://act.colorofchange.org/sign/justiceforfloyd_george_floyd_minneapolis",
                            title: "#JusticeforFloyd: Demand the officers who killed George Floyd are charged with murder.",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                    ]
                },
                {
                    id: "category/justice-for-ahmuad-aubrey",
                    title: "Justice For Ahmuad Aubrey",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula.",
                    petitions: [
                        {
                            url: "https://www.change.org/p/federal-bureau-of-investigation-disbarment-of-george-e-barnhill",
                            siteDomain: "change.org",
                            id: "petition/https://www.change.org/p/federal-bureau-of-investigation-disbarment-of-george-e-barnhill",
                            title: "Disbarment of George E. Barnhill",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://www.change.org/p/human-rights-campaign-justice-for-ahmuad-aubrey-2",
                            siteDomain: "change.org",
                            id: "petition/https://www.change.org/p/human-rights-campaign-justice-for-ahmuad-aubrey-2",
                            title: "Justice For Ahmuad Arbery",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://www.change.org/p/district-attorney-tom-durden-justice-for-ahmaud-arbery-i-run-with-maud",
                            siteDomain: "change.org",
                            id: "petition/https://www.change.org/p/district-attorney-tom-durden-justice-for-ahmaud-arbery-i-run-with-maud",
                            title: "Justice for Ahmaud Arbery! I Run with Maud!",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        }
                    ]
                },
                {
                    id: "category/justice-for-breonna-taylor",
                    title: "Justice for Breonna Taylor",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula.",
                    petitions: [
                        {
                            url: "https://www.change.org/p/andy-beshear-justice-for-breonna-taylor",
                            siteDomain: "change.org",
                            id: "petition/https://www.change.org/p/andy-beshear-justice-for-breonna-taylor",
                            title: "Justice for Breonna Taylor",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://www.thepetitionsite.com/152/670/429/justice-for-breonna-taylor-another-innocent-black-woman-murdered-by-police-in-her-own-home",
                            siteDomain: "thepetitionsite.com",
                            id: "petition/https://www.thepetitionsite.com/152/670/429/justice-for-breonna-taylor-another-innocent-black-woman-murdered-by-police-in-her-own-home",
                            title: "Justice for Breonna Taylor, Another Innocent Black Woman Murdered by Police in Her Own Home",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://act.colorofchange.org/sign/justiceforbre-breonna-taylor-officers-fired",
                            siteDomain: "colorofchange.org",
                            id: "petition/https://act.colorofchange.org/sign/justiceforbre-breonna-taylor-officers-fired",
                            title: "#JusticeforBre: Police officers who killed Breonna Taylor must be FIRED.",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://sign.moveon.org/petitions/justiceforbre-police-officers-who-killed-breonna-taylor-must-be-fired",
                            siteDomain: "moveon.org",
                            id: "petition/https://sign.moveon.org/petitions/justiceforbre-police-officers-who-killed-breonna-taylor-must-be-fired",
                            title: "#JusticeforBre: Police officers who killed Breonna Taylor must be FIRED.",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        },
                        {
                            url: "https://action.justiceforbreonna.org/sign/BreonnaWasEssential",
                            siteDomain: "justiceforbreonna.org",
                            id: "petition/https://action.justiceforbreonna.org/sign/BreonnaWasEssential",
                            title: "#JusticeForBre",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque. Fusce id justo sit amet arcu tristique sagittis et vitae lectus. Quisque sit amet tincidunt turpis. Morbi est enim, interdum at nisi in, porta accumsan orci. Aliquam non turpis eu odio viverra faucibus. Sed sed risus sed tortor dignissim molestie vitae sed erat. Nullam ac urna tempor urna varius tempus. Praesent enim lectus, egestas vel ex a, mattis porttitor velit. Morbi vulputate consequat leo eget vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mollis elit. Nulla risus augue, tristique a erat id, molestie luctus neque.",
                        }
                    ]
                },
            ]
        }
    ]
};


export const users: UserTable = {
    users: [
        {
            id: 'user/0',
            firstName: 'john',
            lastName: 'doe',
            emailAddress: 'john@example.com',
            postalCode: '00123',
            stateAbbrev: 'OR',
            stateFull: 'Oregon',
            middleName: 'marie',
            city: 'Thor',
            streetAddress: '111 Turmeric Drive',
            timeAdded: new Date()
        }
    ]
};


export const runs: RunTable = {
    runs: [
        {
            id: 'run/nhjrwkfq',
            userId: 'user/0',
            signatures: [
                {
                    id: 'sig/atcafsg',
                    status: 'cancelled',
                    petitionId: "petition/https://www.change.org/p/federal-bureau-of-investigation-disbarment-of-george-e-barnhill",
                    index: 0
                },
            ]
        },
        {
            id: 'run/reinwfbnjrf',
            userId: 'user/0',
            signatures: [
                {
                    id: 'sig/bwfjkwerf',
                    status: 'success',
                    petitionId: "petition/https://www.change.org/p/federal-bureau-of-investigation-disbarment-of-george-e-barnhill",
                    index: 0
                },
                {
                    id: 'sig/wvwtfvf',
                    status: 'success',
                    petitionId: "petition/https://www.change.org/p/human-rights-campaign-justice-for-ahmuad-aubrey-2",
                    index: 1
                },
                {
                    id: 'sig/adgasdgtrg',
                    status: 'queued',
                    petitionId: "petition/https://www.change.org/p/district-attorney-tom-durden-justice-for-ahmaud-arbery-i-run-with-maud",
                    index: 2
                }
            ]
        },
        {
            id: 'run/nfqrmfnrwhjfnow',
            userId: 'user/0',
            signatures: [
                {
                    id: 'sig/afdsdgdthg5e',
                    status: 'queued',
                    petitionId: "petition/https://www.thepetitionsite.com/152/670/429/justice-for-breonna-taylor-another-innocent-black-woman-murdered-by-police-in-her-own-home",
                    index: 0
                }
            ]
        }
    ]
};
