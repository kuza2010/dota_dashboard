import {PLAYER_FETCH_FAILURE, PLAYER_FETCH_SUCCESSFUL, PLAYER_REQUESTED} from "../actions/player-actions";


const playerRequested = () => {
    return {
        type: PLAYER_REQUESTED,
    }
}

const playerLoaded = (player) => {
    return {
        type: PLAYER_FETCH_SUCCESSFUL,
        payload: player,
    }
}

const playerError = (error) => {
    return {
        type: PLAYER_FETCH_FAILURE,
        payload: error
    }
}

const fetchPlayer = (accountId) => (openDotaService, dispatch) => {
    dispatch(playerRequested());
    openDotaService.getPlayer(accountId)
        .then(player => dispatch(playerLoaded(player)))
        .catch(error => dispatch(playerError(error)));
}


export {
    playerError,
    playerLoaded,
    playerRequested,
    fetchPlayer,
}