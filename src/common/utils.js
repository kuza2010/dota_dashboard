import countryCodes from "../common/country-codes"
import moment from "moment";
import {
    armorCoefficient,
    baseApiURL,
    DAMAGE_TYPE_DEFAULT_COLOR,
    DAMAGE_TYPE_MAGICAL_COLOR,
    DAMAGE_TYPE_PHYSICAL_COLOR,
    DAMAGE_TYPE_PURE_COLOR,
    defaultRoleAssignment,
    healthPerStraight,
    laneMapping,
    laneRoleMapping,
    manaPerIntellect,
    manaRegenerationCoefficient,
    NA, NO_COLOR, YES_COLOR
} from "./enum";


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
        return NA;
    }
    return `${Math.round(part / total * 100)}%`;
}

const getImageURL = (postfix) => {
    return `${baseApiURL}/${postfix.startsWith('/') ? postfix.slice(1, postfix.length) : postfix}`
}

const getSpellDamageTypeColor = (type = "") => {
    switch (type.trim().toLowerCase()) {
        case "magic":
        case "magical":
            return DAMAGE_TYPE_MAGICAL_COLOR
        case "pure":
            return DAMAGE_TYPE_PURE_COLOR
        case "physical":
            return DAMAGE_TYPE_PHYSICAL_COLOR
        default:
            return DAMAGE_TYPE_DEFAULT_COLOR
    }
}

const getSpellImmunityColor = (yesOrNo = "no") => {
    switch (yesOrNo.trim().toLowerCase()) {
        case "yes":
            return YES_COLOR
        default:
            return NO_COLOR
    }
}

/**
 * Calculate some hero stats
 */

// ref link: https://dota2.gamepedia.com/Attack_damage
const getHeroDamage = (minDamage, maxDamage, primaryAttributePoints) => (
    `${minDamage + primaryAttributePoints} - ${maxDamage + primaryAttributePoints}`
)

const getAttackSpeed = (baseAgility, attackRate) =>
    _humanReadableText(_getAttackSpeed)(baseAgility, attackRate)

const getBaseHeroHealth = (baseHealth, baseStraight) =>
    _humanReadableText(_getBaseHeroHealth, 0)(baseHealth, baseStraight)

const getHealthRegeneration = (baseStraight, baseHealthRegen) =>
    _humanReadableText(_getHealthRegeneration)(baseStraight, baseHealthRegen)

const getBaseHeroMana = (baseMana, baseIntellect) =>
    _humanReadableText(_getBaseHeroMana, 0)(baseMana, baseIntellect)

const getManaRegeneration = (baseIntellect) =>
    _humanReadableText(_getManaRegeneration)(baseIntellect)

const getHeroArmor = (baseArmor, baseAgility) =>
    _humanReadableText(_getHeroArmor)(baseArmor, baseAgility)


/**
 * Private method
 */

// ref link: https://dota2.gamepedia.com/Attack_speed#Attack_speed_formula
const _getAttackSpeed = (baseAgility, attackRate) => ((100 + baseAgility) * 0.01) / attackRate

// ref link: https://dota2.gamepedia.com/Mana
const _getBaseHeroHealth = (baseHealth, baseStraight) => baseHealth + (baseStraight * healthPerStraight)

// ref link: https://dota2.gamepedia.com/Health_regeneration
const _getHealthRegeneration = (baseStraight, baseHealthRegen) => baseHealthRegen + (baseStraight * 0.1)

// ref link: https://dota2.gamepedia.com/Mana
const _getBaseHeroMana = (baseMana, baseIntellect) => baseMana + (baseIntellect * manaPerIntellect)

// ref link: https://dota2.gamepedia.com/Mana#Version_history
const _getManaRegeneration = (baseIntellect) => baseIntellect * manaRegenerationCoefficient

// ref link: https://dota2.gamepedia.com/Armor#Main_armor
const _getHeroArmor = (baseArmor, baseAgility) => baseArmor + (baseAgility * armorCoefficient)

function _humanReadableText(getFunc, fractionDigits = 2) {
    return function (...argv) {
        return getFunc(...argv).toFixed(fractionDigits);
    }
}


export {
    zip,
    stringCompare,
    getCountryFlag,
    getTimeFromNow,
    filterPlugin,
    filterTeams,
    calculateRolesInPercent,
    getImageURL,

    getSpellDamageTypeColor,
    getSpellImmunityColor,

    getHeroDamage,
    getAttackSpeed,
    getBaseHeroHealth,
    getHealthRegeneration,
    getBaseHeroMana,
    getManaRegeneration,
    getHeroArmor,
};