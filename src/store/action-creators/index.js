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

const fetchHeroes = (openDotaService, dispatch) => {
    dispatch(heroRequested());
    openDotaService.getHeroStats()
        .then(heroes => dispatch(heroLoaded(heroes)))
        .catch(error => dispatch(heroError(error)));
}


export {
    fetchHeroes,
    heroRequested,
    heroLoaded,
    heroError,
};