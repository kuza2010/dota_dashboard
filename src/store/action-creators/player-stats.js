import {
    PLAYER_RECENT_MATCHES_FULL_STAT_FAILED,
    PLAYER_RECENT_MATCHES_FULL_STAT_SUCCESSFUL,
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

const playerRecentMatchesSuccessful = (matches) => {
    return {
        type: PLAYER_RECENT_MATCHES_FULL_STAT_SUCCESSFUL,
        payload: matches,
    }
}

const playerRecentMatchesFullStatFailed = (error) => {
    return {
        type: PLAYER_RECENT_MATCHES_FULL_STAT_FAILED,
        payload: error,
    }
}

/**
 * This function fetched recent player matches and make all necessary data-mapping
 * @param accountId - account id
 */
const fetchRecentPlayerMatchesStats = (accountId) => (openDotaService, dispatch) => {
    dispatch(playerStatsRequested());
    openDotaService.getRecentPlayerMatchesStats(accountId)
        .then(stats => dispatch(playerStatsLoaded(stats)))
        .catch(error => dispatch(playerStatsError(error)));
}

/**
 * This function fetched all necessary statistics recent player matches and make all necessary data mapping
 * @param matchesIds - match ids list
 * @param accountId - account id
 */
const fetchFullStats = (matchesIds, accountId) => (openDotaService, dispatch) => {
    openDotaService.getLastMatchesStats(matchesIds, accountId)
        .then(res => {
            console.log("stats: ", res)
            dispatch(playerRecentMatchesSuccessful(res));
        })
        .catch(err => {
            console.error("FAILED FETCH FULL STATS!!!",err);
            dispatch(playerRecentMatchesFullStatFailed(err));
        })
}


export {
    fetchRecentPlayerMatchesStats,
    fetchFullStats,
}