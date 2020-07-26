import {HERO_FETCH_FAILURE, HERO_FETCH_SUCCESSFUL, HERO_REQUESTED} from "../actions";


const heroRequested = () => {
    return {
        type: HERO_REQUESTED,
    }
}

const heroLoaded = (heroes) => {
    return {
        type: HERO_FETCH_SUCCESSFUL,
        payload: heroes,
    }
}

const heroError = (error) => {
    return {
        type: HERO_FETCH_FAILURE,
        payload: error
    }
}


export {
    heroRequested,
    heroLoaded,
    heroError,
};