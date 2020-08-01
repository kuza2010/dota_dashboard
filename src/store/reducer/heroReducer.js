import {HERO_FETCH_FAILURE, HERO_FETCH_SUCCESSFUL, HERO_REQUESTED} from "../actions/hero-actions";


const initialState = {
    heroes: [],
    loading: true,
    error: null,
}

const heroReducer = (state = initialState, action) => {
    switch (action.type) {
        case HERO_REQUESTED:
            return {...initialState,}
        case HERO_FETCH_SUCCESSFUL:
            return {
                heroes: action.payload,
                loading: false,
                error: null,
            }
        case HERO_FETCH_FAILURE:
            return {
                heroes: [],
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}


export default heroReducer;