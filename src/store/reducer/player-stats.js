import {
    PLAYER_STATS_FETCH_FAILURE,
    PLAYER_STATS_FETCH_SUCCESSFUL,
    PLAYER_STATS_REQUESTED
} from "../actions/player-stats";


const initialState = {
    stats: [],
    loading: true,
    error: null,
}

const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAYER_STATS_REQUESTED:
            return {...initialState};
        case PLAYER_STATS_FETCH_SUCCESSFUL:
            return {
                stats: [...action.payload],
                loading: false,
                error: null,
            };
        case PLAYER_STATS_FETCH_FAILURE:
            return {
                stats: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}


export default statsReducer;