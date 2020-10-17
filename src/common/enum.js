export const position = {
    carry: "carry",
    mid: "mid",
    offlane: "offlane",
    support: "support",
}

export const defaultRoleAssignment = {
    carry: "N/A",
    mid: "N/A",
    offlane: "N/A",
    support: "N/A",
};

export const laneMapping = {
    bot: 1,
    mid: 2,
    top: 3,
    rjung: 4,
    djung: 5,
};

export const laneRoleMapping = {
    carry: 1,
    mid: 2,
    offlane: 3,
    supp1: 4,       // 4 pos?
    supp2: 5,       //5 pos?
};

export const STRENGTH_COLOR = "#f4353c"
export const AGILITY_COLOR = "#39d402"
export const INTELLECT_COLOR = "#01a9f4"

export const TRIGGER_SPELL_SIZE = 6

// https://dota2.gamepedia.com/Health
export const healthPerStraight = 20
// https://dota2.gamepedia.com/Mana
export const manaPerIntellect = 12
// https://dota2.gamepedia.com/Mana#Version_history
export const manaRegenerationCoefficient = 0.05
// https://dota2.gamepedia.com/Armor#Main_armor
export const armorCoefficient = 0.166666667

export const NA = "N/A"
export const baseApiURL = "https://api.opendota.com";