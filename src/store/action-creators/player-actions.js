import {PLAYER_FETCH_FAILURE, PLAYER_FETCH_SUCCESSFUL, PLAYER_REQUESTED} from "../actions/player-actions";


const playerRequested = () => {
    return {
        type: PLAYER_REQUESTED,
    }
}

const playersLoaded = (players) => {
    return {
        type: PLAYER_FETCH_SUCCESSFUL,
        payload: players,
    }
}

const playersError = (error) => {
    return {
        type: PLAYER_FETCH_FAILURE,
        payload: error
    }
}

const fetchPlayers = (openDotaService, dispatch) => {
    dispatch(playerRequested());
    openDotaService.getProPlayers()
        .then(players => dispatch(playersLoaded(players)))
        .catch(error => dispatch(playersError(error)));
}


export {
    playersError,
    playersLoaded,
    playerRequested,
    fetchPlayers,
}