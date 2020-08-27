import {
    PLAYER_STATS_FETCH_FAILURE,
    PLAYER_STATS_FETCH_SUCCESSFUL,
    PLAYER_STATS_REQUESTED
} from "../actions/player-stats";


const playerStatsRequested = () => {
    return {
        type: PLAYER_STATS_REQUESTED,
    }
}

const playerStatsLoaded = (stats) => {
    return {
        type: PLAYER_STATS_FETCH_SUCCESSFUL,
        payload: stats,
    }
};

const playerStatsError = (error) => {
    return {
        type: PLAYER_STATS_FETCH_FAILURE,
        payload: error,
    }
};

const fetchRecentMatches = (accountId) => (openDotaService, dispatch) => {
    dispatch(playerStatsRequested());
    openDotaService.getPlayerStats(accountId)
        .then(stats => {
            dispatch(playerStatsLoaded(stats));
            const matchesIds = stats.map(stat => stat.matchId);
            openDotaService.getLastMatchesStats(matchesIds, accountId)
                .then(res => console.log(res))
                .catch(error => console.error(error));

        })
        .catch(error => dispatch(playerStatsError(error)));
}


export {
    fetchRecentMatches,
}