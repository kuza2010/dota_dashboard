import {PRO_PLAYER_FETCH_FAILURE, PRO_PLAYER_FETCH_SUCCESSFUL, PRO_PLAYER_REQUESTED} from "../actions/pro-player-actions";


const playerRequested = () => {
    return {
        type: PRO_PLAYER_REQUESTED,
    }
}

const playersLoaded = (players) => {
    return {
        type: PRO_PLAYER_FETCH_SUCCESSFUL,
        payload: players,
    }
}

const playersError = (error) => {
    return {
        type: PRO_PLAYER_FETCH_FAILURE,
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