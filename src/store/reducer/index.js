import {combineReducers} from "redux";

import heroReducer from "./hero-reducer";
import proPlayersReducer from "./pro-players-reducer";
import playerReducer from "./player-reducer"
import statsReducer from "./player-stats";

const reducer = combineReducers({
    heroes: heroReducer,
    players: proPlayersReducer,
    player: playerReducer,
    playerStats: statsReducer,
});


export default reducer;