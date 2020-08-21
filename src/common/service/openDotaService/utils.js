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
}

const convertProPlayer = (proPlayer) => {
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
}


const getPlayerDAO = (proPlayer, specificPlayer, teams) => {
    const team = teams.find(team => team['team_id'] === proPlayer['team_id']);

    return {
        //specific
        rank: specificPlayer['solo_competitive_rank'],
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
            logo: team['logo_url'],
        },
    };
}


export {
    filterProPlayers,
    convertProPlayer,

    getPlayerDAO,
}