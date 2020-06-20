import change_org from './scripts/change.org'
import thepetitionsite_com from './scripts/thepetitionsite.com'
import colorofchange_org from './scripts/colorofchange.org'
import justiceforbreonna_org from './scripts/justiceforbreonna.org'
import amnesty_org from './scripts/amnesty.org'
import moveon_org from './scripts/moveon.org'
import {PetitionScript} from "./script-lib"

export const scripts: {[domain: string]: PetitionScript} = {
    'change.org': change_org,
    'thepetitionsite.com': thepetitionsite_com,
    "colorofchange.org": colorofchange_org,
    'justiceforbreonna.org': justiceforbreonna_org,
    "amnesty.org": amnesty_org,
    "moveon.org": moveon_org
};
