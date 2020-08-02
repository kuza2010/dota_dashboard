import countryCodes from "../common/country-codes"
import moment from "moment";


/**
 * Zip two arrays. The length of the arrays must be equal.
 */
const zip = (a, b) => {
    return a.map((element, idx) => [element, b[idx]])
}

const stringCompare = (str1, str2) => {
    return str1.toString().localeCompare(str2.toString());
}

/**
 * Get country flag for provided player
 * The player object should contain 'player.country_code' field with ISO-2 country code value
 */
const getCountryFlag = (player) => {
    if (!player || !player["country_code"]) {
        return "undefined"
    }

    const flag = countryCodes.find(country => country.iso2 === player["country_code"]);
    if (!flag) {
        return "undefined"
    }

    return flag.image;
}


const getTimeFromNow = (time, pattern = "YYYY-MM-DDTHH:mm") => (
    moment(time, pattern).fromNow()
)


export {
    zip,
    stringCompare,

    getCountryFlag,

    getTimeFromNow,
};