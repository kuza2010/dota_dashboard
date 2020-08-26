import {PLAYER_FETCH_FAILURE, PLAYER_FETCH_SUCCESSFUL, PLAYER_REQUESTED} from "../actions/player-actions";


const initialState = {
    player: {},
    loading: true,
    error: null,
}

const proPlayersReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAYER_REQUESTED:
            return {...initialState,};
        case PLAYER_FETCH_SUCCESSFUL:
            return {
                player: action.payload,
                loading: false,
                error: null,
            };
        case PLAYER_FETCH_FAILURE:
            return {
                player: {},
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export default proPlayersReducer;