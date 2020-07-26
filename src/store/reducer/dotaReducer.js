import {HERO_FETCH_FAILURE, HERO_FETCH_SUCCESSFUL, HERO_REQUESTED} from "../actions";


const dotaReducer = (state = {}, action) => {
    switch (action.type) {
        case HERO_REQUESTED:
            console.log("hero requested");
            return {

            }
            break;
        case HERO_FETCH_SUCCESSFUL:
            console.log("hero successful");
            break;
        case HERO_FETCH_FAILURE:
            console.log("hero failed");
            break;
        default:
            return state;
    }
}


export default dotaReducer;