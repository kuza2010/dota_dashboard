import {PLAYER_FETCH_FAILURE, PLAYER_FETCH_SUCCESSFUL, PLAYER_REQUESTED} from "../actions/player-actions";


const playerRequested = (id) => {
    return {
        type: PLAYER_REQUESTED,
    }
}

const playerLoaded = (players) => {
    return {
        type: PLAYER_FETCH_SUCCESSFUL,
        payload: players,
    }
}

const playerError = (error) => {
    return {
        type: PLAYER_FETCH_FAILURE,
        payload: error
    }
}

const fetchPlayer = (playerId) => (openDotaService, dispatch) => {
    dispatch(playerRequested(playerId));
    openDotaService.getProPlayers()
        .then(players => dispatch(playerLoaded(players)))
        .catch(error => dispatch(playerError(error)));
}


export {
    playerError,
    playerLoaded,
    playerRequested,
    fetchPlayer,
}