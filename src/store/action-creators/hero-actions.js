import {
    HERO_INFO_LOADED,
    HERO_INFO_NOTFOUND,
    HERO_INFO_REQUESTED,
    HEROES_FETCH_FAILURE,
    HEROES_FETCH_SUCCESSFUL,
    HEROES_REQUESTED
} from "../actions/hero-actions";


const heroesRequested = () => {
    return {
        type: HEROES_REQUESTED,
    }
}

const heroesLoaded = (heroes) => {
    return {
        type: HEROES_FETCH_SUCCESSFUL,
        payload: heroes,
    }
}

const heroesError = (error) => {
    return {
        type: HEROES_FETCH_FAILURE,
        payload: error
    }
}

const heroInfoRequested = () => {
    return {
        type: HERO_INFO_REQUESTED,
    }
}

const heroInfoLoaded = (heroInfo) => {
    return {
        type: HERO_INFO_LOADED,
        payload: heroInfo,
    }
}

const heroInfoError = (error) => {
    return {
        type: HERO_INFO_NOTFOUND,
        payload: error
    }
}

const fetchHeroes = (openDotaService) => (dispatch) => {
    dispatch(heroesRequested());
    openDotaService.getHeroesStats()
        .then(heroes => dispatch(heroesLoaded(heroes)))
        .catch(error => dispatch(heroesError(error)));
}

const fetchHero = (heroId, openDotaService) => (dispatch) => {
    dispatch(heroInfoRequested())
    openDotaService.getHero(heroId)
        .then(heroInfo => dispatch(heroInfoLoaded(heroInfo)))
        .catch(error => {
            console.log(typeof error)
            dispatch(heroInfoError(error))
        })
}


export {
    fetchHeroes,
    fetchHero,
};