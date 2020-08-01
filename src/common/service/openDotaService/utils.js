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


const convertPlayer = (player) => {
    return {
        account_id: player["account_id"],
        steamid: player["steamid"],
        avatar: player["avatar"],
        avatarmedium: player["avatarmedium"],
        country_code: player["country_code"],
        last_match_time: player["last_match_time"],
        name: player["name"],
        team_id: player["team_id"],
        team_name: player["team_name"],
        rating: player["solo_competitive_rank"],
    };
}


export {
    filterProPlayers,
    convertPlayer,
}