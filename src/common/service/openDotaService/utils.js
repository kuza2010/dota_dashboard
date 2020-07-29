const filterPlayers = (players) => (...fields) => {
    if (!players || players.length === 0) {
        return players;
    }
    if (!fields || fields.length === 0) {
        return players;
    }

    return players.filter(player => {
        function fieldCheckerReducer(condition, fieldName) {
            if (!condition) {
                return false;
            }
            return !!player[fieldName];
        }

        return fields.reduce(fieldCheckerReducer, true);
    })
}


export {
    filterPlayers,
}