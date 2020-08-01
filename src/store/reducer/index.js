import {combineReducers} from "redux";
import heroReducer from "./heroReducer";
import playerReducer from "./playerReducer";

const reducer = combineReducers({
    heroes: heroReducer,
    players: playerReducer
});


export default reducer;