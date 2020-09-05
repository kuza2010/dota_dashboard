import {combineReducers} from "redux";

import heroReducer from "./hero-reducer";
import proPlayersReducer from "./pro-players-reducer";
import playerReducer from "./player-reducer"
import statsReducer from "./player-stats";
import teamReducer from "./teams-teducer";

const reducer = combineReducers({
    heroes: heroReducer,
    players: proPlayersReducer,
    player: playerReducer,
    playerStats: statsReducer,
    team: teamReducer,
});


export default reducer;