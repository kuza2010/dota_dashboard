import {baseApiURL} from "../../enum";
import NotFoundException from "../../exception/not-found-exception";

// Pro Players
const filterProPlayers = (players) => (...criteria) => {
    if (!players || players.length === 0) {
        return players;
    }
    if (!criteria || criteria.length === 0) {
        return players;
    }

    return players.filter(player => {
        function fieldCheckerReducer(condition, fieldName) {
            if (!condition) {
                return false;
            }
            return !!player[fieldName];
        }

        return criteria.reduce(fieldCheckerReducer, true);
    });
};

const toProPlayerDTO = (proPlayer) => {
    return {
        account_id: proPlayer["account_id"],
        steamid: proPlayer["steamid"],
        avatar: proPlayer["avatar"],
        avatarmedium: proPlayer["avatarmedium"],
        country_code: proPlayer["country_code"],
        last_match_time: proPlayer["last_match_time"],
        name: proPlayer["name"],
        team_id: proPlayer["team_id"],
        team_name: proPlayer["team_name"],
        rating: proPlayer["solo_competitive_rank"],
    };
};

// Player
const toPlayerDTO = (proPlayer, specificPlayer, teams) => {
    const team = teams.find(team => team['teamId'] === proPlayer['team_id']);

    return {
        //specific
        rank: specificPlayer['solo_competitive_rank'],
        estimateRank: specificPlayer['mmr_estimate']['estimate'],
        accountId: specificPlayer['profile']['account_id'],
        personName: specificPlayer['profile']['personaname'],
        nickname: specificPlayer['profile']['name'],
        steamId: specificPlayer['profile']['steamid'],
        avatar: specificPlayer['profile']['avatarfull'],
        lastMatch: proPlayer['last_match_time'],
        countryCode: proPlayer['country_code'],
        team: {
            id: proPlayer['team_id'],
            name: proPlayer['team_name'],
            tag: proPlayer['team_tag'],
            logo: team ? team['logo'] : undefined,
        },
    };
};

// Common stats
const toCommonMatchesStatsDTO = (commonStats = []) => {
    if (!commonStats || commonStats.length <= 0) {
        return commonStats;
    }

    return commonStats
        .filter(stat => stat['lobby_type'] === 1 && stat['game_mode'] === 2)
        .map(stat => {
            return {
                matchId: stat['match_id'],
                playerSlot: stat['player_slot'],
                gameMode: stat['game_mode'],
                lobbyType: stat['lobby_type'],
                kills: stat['kills'],
                deaths: stat['deaths'],
                assists: stat['assists'],
                lane: stat['lane'],
                laneRole: stat['lane_role'],
            };
        })
};

//Match
const toMatchDTO = (match, heroes, accountId) => {
    const player = match.players.find(player => +player["account_id"] === +accountId);
    const hero = heroes.find(hero => +hero["id"] === +player["hero_id"]);

    // filter broke match
    if (match["radiant_team"] === undefined || match["dire_team"] === undefined) return null;

    return {
        startTime: match["start_time"],
        radiantTeam: {
            teamId: match["radiant_team"]["team_id"],
            name: match["radiant_team"]["name"],
            tag: match["radiant_team"]["tag"],
            logo: match["radiant_team"]["logo"],
        },
        direTeam: {
            teamId: match["dire_team"]["team_id"],
            name: match["dire_team"]["name"],
            tag: match["dire_team"]["tag"],
            logo: match["dire_team"]["logo_url"],
        },
        league: match["league"]["name"],
        player: {
            accountId,
            assists: player["assists"],
            kills: player["kills"],
            deaths: player["deaths"],
            heroId: player["hero_id"],
            heroName: hero["localized_name"],
            heroImage: `${baseApiURL}${hero.img}`,
            isRadiant: player["isRadiant"],
            radiantWin: player["radiant_win"],
        },
    }
};

//Teams
const toTeamsDTO = (...teams) => {
    if (teams.length <= 0) {
        return [];
    }

    return teams.map(team => {
        return {
            teamId: team["team_id"],
            rating: team["rating"],
            wins: team["wins"],
            losses: team["losses"],
            lastMatchTime: team["last_match_time"],
            name: team["name"],
            tag: team["tag"],
            logo: team["logo_url"],
        };
    })
}

//Hero
const getHeroInfo = (heroId, heroes, abilitiesAndTalents, description) => {
    const hero = heroes.find(hero => +hero.id === +heroId)
    console.log(hero)
    if (hero === undefined) {
        throw new NotFoundException(`No hero with id: ${heroId}`, heroId)
    }

    // name like as 'npc_dota_hero_XXX'
    const {name} = hero
    // filter and prepare data for ability and talents
    const heroAbilitiesAndTalents = _filterAbilityAndTalents(name, abilitiesAndTalents)

    const ATwithDescription = {
        abilities: heroAbilitiesAndTalents.abilities.map(ability => description[ability]),
        talents: heroAbilitiesAndTalents.talents.map(talent => talent),
    }

    return toHeroStatsDTO(hero, ATwithDescription)
}

const _filterAbilityAndTalents = (heroName, abilitiesAndTalents) => {
    const heroAbilitiesAndTalents = abilitiesAndTalents[heroName]

    //filter ability
    const filtered = heroAbilitiesAndTalents.abilities
        .filter(ability => !ability.startsWith("generic_hidden"));

    return {
        abilities: [...filtered],
        talents: heroAbilitiesAndTalents.talents,
    }
}

const toHeroStatsDTO = (hero, abilitiesAndTalents) => {
    if (!hero) {
        console.error("toHeroDTO(), heroes is not provided")
        return {}
    }

    return {
        id: hero["id"],
        name: hero["name"],
        localizedName: hero["localized_name"],
        primaryAttr: _primaryAttribute(hero),
        attackType: hero["attack_type"],
        roles: hero["roles"],
        img: hero["img"],
        icon: hero["icon"],
        baseHealth: hero["base_health"],
        baseHealthRegen: hero["base_health_regen"],
        baseMana: hero["base_mana"],
        baseManaRegen: hero["base_mana_regen"],
        baseArmor: hero["base_armor"],
        baseMr: hero["base_mr"],
        baseAttackMin: hero["base_attack_min"],
        baseAttackMax: hero["base_attack_max"],
        baseStraight: hero["base_str"],
        baseAgility: hero["base_agi"],
        baseIntellect: hero["base_int"],
        strGain: hero["str_gain"],
        agiGain: hero["agi_gain"],
        intGain: hero["int_gain"],
        attackRange: hero["attack_range"],
        projectileSpeed: hero["projectile_speed"],
        attackRate: hero["attack_rate"],
        moveSpeed: hero["move_speed"],
        turnRate: hero["turn_rate"],
        cmEnabled: hero["cm_enabled"],
        legs: hero["legs"],
        proWin: hero["pro_win"],
        proPick: hero["pro_pick"],

        abilitiesAndTalents,
    }
}

const _primaryAttribute = (hero) => {
    switch (hero["primary_attr"]) {
        case "str":
            return hero["base_str"]
        case "int":
            return hero["base_int"]
        case "agi":
            return hero["base_agi"]
        default:
            return 0
    }
}

// Benchmarks
const toHeroBenchmarksDTO = (benchmarks) => {
    if (undefined === benchmarks || undefined === benchmarks.result) {
        return {}
    }
    const {result} = benchmarks

    return {
        goldPerMin: result["gold_per_min"],
        xpPerMin: result["xp_per_min"],
        heroDamagePerMin: result["hero_damage_per_min"],
        heroHealingPerMin: result["hero_healing_per_min"],
        towerDamage: result["tower_damage"],
        killsPerMin: result["kills_per_min"],
        lastHitsPerMin: result["last_hits_per_min"],
        stunsPerMin: result["stuns_per_min"],
    }
}


export {
    filterProPlayers,

    toProPlayerDTO,
    toPlayerDTO,
    toCommonMatchesStatsDTO,
    toMatchDTO,
    toTeamsDTO,
    getHeroInfo,
    toHeroBenchmarksDTO
}