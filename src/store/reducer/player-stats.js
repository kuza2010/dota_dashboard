import {
    PLAYER_STATS_FETCH_FAILURE,
    PLAYER_STATS_FETCH_SUCCESSFUL,
    PLAYER_STATS_REQUESTED
} from "../actions/player-stats";


const recentMatchesInitState = {
    stats: [],
    loading: true,
    error: null,
}

const initialState = {
    recentMatches: recentMatchesInitState,
};

const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAYER_STATS_REQUESTED: {
            const {recentMatches: {stats}} = state;

            if (stats.length === 0) {
                return {...initialState};
            }

            return {
                ...initialState,
                recentMatches: {
                    error: null,
                    loading: false,
                    stats: stats
                },
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
        default:
            return state;
    }
}


export default statsReducer;