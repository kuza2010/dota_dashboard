import {heroImageStaticURL} from "../../enum";

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
    const player = match.players.find(player => player["account_id"] == accountId);
    const hero = heroes.find(hero => hero["id"] == player["hero_id"]);

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
            heroImage: `${heroImageStaticURL}${hero.img}`,
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


export {
    filterProPlayers,

    toProPlayerDTO,
    toPlayerDTO,
    toCommonMatchesStatsDTO,
    toMatchDTO,
    toTeamsDTO,
}