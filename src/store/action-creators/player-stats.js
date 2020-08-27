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

const fetchStats = (accountId) => (openDotaService, dispatch) => {
    dispatch(playerStatsRequested());
    openDotaService.getPlayerStats(accountId)
        .then(stats => {
            console.log('stats were loaded, dispatch stats loaded')
            dispatch(playerStatsLoaded(stats));
        })
        .catch(error => dispatch(playerStatsError(error)));
}


export {
    fetchStats,
}