import {
    HERO_INFO_LOADED,
    HERO_INFO_NOTFOUND,
    HERO_INFO_REQUESTED,
    HEROES_FETCH_FAILURE,
    HEROES_FETCH_SUCCESSFUL,
    HEROES_REQUESTED
} from "../actions/hero-actions";

const allHeroesInitialState = {
    heroes: [],
    loading: true,
    error: null,
}

const selectedHero = {
    hero: null,
    loading: true,
    error: null,
}

const initialState = {
    allHeroes: allHeroesInitialState,
    selectedHero,
}

const heroReducer = (state = initialState, action) => {
    switch (action.type) {
        case HEROES_REQUESTED:
            return {
                ...initialState,
                selectedHero: {...state.selectedHero},
            }
        case HEROES_FETCH_SUCCESSFUL:
            return {
                ...state,
                allHeroes: {
                    heroes: action.payload,
                    loading: false,
                    error: null,
                }
            }
        case HEROES_FETCH_FAILURE:
            return {
                ...initialState,
                allHeroes: {
                    heroes: [],
                    loading: false,
                    error: action.payload,
                }
            }
        case HERO_INFO_REQUESTED:
            return {
                ...state,
                selectedHero: {
                    hero: null,
                    loading: true,
                    error: null,
                }
            }
        case HERO_INFO_LOADED:
            return {
                ...state,
                selectedHero: {
                    hero: action.payload,
                    loading: false,
                    error: null,
                }
            }
        case HERO_INFO_NOTFOUND:
            return {
                ...state,
                selectedHero: {
                    hero: null,
                    loading: false,
                    error: action.payload,
                }
            }
        default:
            return state;
    }
}


export default heroReducer;