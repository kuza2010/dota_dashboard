import countryCodes from "../common/country-codes"
import moment from "moment";
import {baseApiURL, defaultRoleAssignment, defaultRoleValue, laneMapping, laneRoleMapping} from "./enum";


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
const getTimeFromNow = (time, pattern) => moment(time, pattern).fromNow();

/**
 * Filter plugin. Just remove undefined plugins
 */
const filterPlugin = (plugins = []) => {
    return plugins.filter(plugin => plugin !== undefined)
}

const calculateRolesInPercent = (stats = []) => {
    if (!stats || stats.length <= 0) {
        return {...defaultRoleAssignment}
    }

    const total = stats.length;             // 20
    let mid = 0;
    let offlane = 0;
    let carry = 0;
    let support = 0;

    stats.forEach(stat => {
        const {laneRole, lane} = stat;

        // mid lane
        if (lane === laneMapping.mid) {
            if (laneRole === laneRoleMapping.mid) {
                mid += 1;                       // lane = 2 and lane role = 2
            } else {
                support += 1;
            }
            return;
        }
        if (lane === laneMapping.top) {
            if (laneRole === laneRoleMapping.carry) {
                carry += 1;
            } else {
                support += 1;
            }
            return;
        }
        if (lane === laneMapping.bot) {
            if (laneRole === laneRoleMapping.carry) {
                offlane += 1;
            } else {
                support += 1;
            }
        }
    });

    return {
        carry: _calcPercent(carry, total),
        mid: _calcPercent(mid, total),
        offlane: _calcPercent(offlane, total),
        support: _calcPercent(support, total),
    };
};

const filterTeams = (teams = []) => {
    return teams.filter(team => {
        if (!team.logo || !team.name) {
            return false;
        }

        return true;
    });
}

const _calcPercent = (part, total) => {
    if (part <= 0) {
        return defaultRoleValue;
    }
    return `${Math.round(part / total * 100)}%`;
}

const getImageURL = (postfix) => {
    return `${baseApiURL}/${postfix.startsWith('/') ? postfix.slice(1, postfix.length) : postfix}`
}


export {
    zip,
    stringCompare,
    getCountryFlag,
    getTimeFromNow,
    filterPlugin,
    filterTeams,
    calculateRolesInPercent,
    getImageURL
};