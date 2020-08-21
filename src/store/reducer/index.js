import {combineReducers} from "redux";

import heroReducer from "./hero-reducer";
import proPlayersReducer from "./pro-players-reducer";
import playerReducer from "./player-reducer"

const reducer = combineReducers({
    heroes: heroReducer,
    players: proPlayersReducer,
    player: playerReducer,
});


export default reducer;