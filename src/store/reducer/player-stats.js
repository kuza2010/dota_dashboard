import {
    PLAYER_RECENT_MATCHES_FULL_STAT_FAILED,
    PLAYER_RECENT_MATCHES_FULL_STAT_SUCCESSFUL,
    PLAYER_STATS_CLEANUP,
    PLAYER_STATS_FETCH_FAILURE,
    PLAYER_STATS_FETCH_SUCCESSFUL,
    PLAYER_STATS_REQUESTED
} from "../actions/player-stats";


const recentMatchesInitState = {
    stats: [],
    loading: true,
    error: null,
}

const fullStatInitState = {
    matches: [],
    loading: true,
    error: null,
}

const initialState = {
    recentMatches: recentMatchesInitState,
    fullStat: fullStatInitState,
};

const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAYER_STATS_CLEANUP:
        case PLAYER_STATS_REQUESTED: {
            return {
                ...initialState,
            };
        }
        case PLAYER_STATS_FETCH_SUCCESSFUL:
            return {
                ...state,
                recentMatches: {
                    stats: [...action.payload],
                    loading: false,
                    error: null,
                },
            };
        case PLAYER_STATS_FETCH_FAILURE:
            return {
                ...state,
                recentMatches: {
                    stats: [],
                    loading: false,
                    error: action.payload,
                },
            };
        case PLAYER_RECENT_MATCHES_FULL_STAT_SUCCESSFUL:
            return {
                ...state,
                fullStat: {
                    matches: [...action.payload],
                    loading: false,
                    error: null,
                }
            }
        case PLAYER_RECENT_MATCHES_FULL_STAT_FAILED:
            return {
                ...state,
                fullStat: {
                    matches: [],
                    loading: false,
                    error: action.payload,
                }
            }
        default:
            return state;
    }
}


export default statsReducer;