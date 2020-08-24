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
 * Get country flag for provided country code ISO-2 or ISO-3 format
 */
const getCountryFlag = (code) => {
    if (!code) {
        return "undefined"
    }

    const flag = countryCodes.find(country => country.iso2 === code || country.iso3 === code);
    if (!flag) {
        return "undefined"
    }

    return flag.image;
}

/**
 * Return human-readable time from now and provided time
 */
const getTimeFromNow = (time, pattern = "YYYY-MM-DDTHH:mm") => moment(time, pattern).fromNow();

/**
 * Filter plugin. Just remove undefined plugins
 */
const filterPlugin = (plugins = []) => {
    return plugins.filter(plugin => plugin !== undefined)
}


export {
    zip,
    stringCompare,

    getCountryFlag,

    getTimeFromNow,

    filterPlugin,
};