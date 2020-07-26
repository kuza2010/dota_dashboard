import {HERO_FETCH_FAILURE, HERO_FETCH_SUCCESSFUL, HERO_REQUESTED} from "../actions";


const heroRequested = () => {
    return {
        type: HERO_REQUESTED,
    }
}

const heroLoaded = () => {
    return {
        type: HERO_FETCH_SUCCESSFUL,
    }
}

const heroError = () => {
    return {
        type: HERO_FETCH_FAILURE,
    }
}


export {
    heroRequested,
    heroLoaded,
    heroError,
};