import {HERO_FETCH_FAILURE, HERO_FETCH_SUCCESSFUL, HERO_REQUESTED} from "../actions";


const initialState = {
    heroes: [],
    loading: true,
    error: null,
}

const dotaReducer = (state = initialState, action) => {
    switch (action.type) {
        case HERO_REQUESTED:
            console.log("hero requested");
            return {...initialState,}
        case HERO_FETCH_SUCCESSFUL:
            console.log("hero successful");

            return {
                heroes: action.payload,
                loading: false,
                error: null,
            }
        case HERO_FETCH_FAILURE:
            console.log("hero failed");

            return {
                heroes: [],
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}


export default dotaReducer;