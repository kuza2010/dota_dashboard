import {PRO_PLAYER_FETCH_FAILURE, PRO_PLAYER_FETCH_SUCCESSFUL, PRO_PLAYER_REQUESTED} from "../actions/pro-player-actions";


const initialState = {
    players: [],
    loading: true,
    error: null,
}

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRO_PLAYER_REQUESTED:
            return {...initialState,}
        case PRO_PLAYER_FETCH_SUCCESSFUL:
            return {
                players: action.payload,
                loading: false,
                error: null,
            }
        case PRO_PLAYER_FETCH_FAILURE:
            return {
                players: [],
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}


export default playerReducer;