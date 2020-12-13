import {
    GAME_DURATION_ERROR, GAME_DURATION_LOADED,
    GAME_DURATION_REQUESTED,
    HERO_BENCHMARKS_ERROR,
    HERO_BENCHMARKS_LOADED,
    HERO_BENCHMARKS_REQUESTED,
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
    benchmarks: null,
    benchmarkError: null,
    gameDurations: null,
    gameDurationsError: null,
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
                    benchmarks: state.selectedHero.benchmarks,
                    hero: null,
                    loading: true,
                    error: null,
                }
            }
        case HERO_INFO_LOADED:
            return {
                ...state,
                selectedHero: {
                    benchmarks: state.selectedHero.benchmarks,
                    hero: action.payload,
                    loading: false,
                    error: null,
                }
            }
        case HERO_INFO_NOTFOUND:
            return {
                ...state,
                selectedHero: {
                    benchmarks: state.selectedHero.benchmarks,
                    hero: null,
                    loading: false,
                    error: action.payload,
                }
            }
        case HERO_BENCHMARKS_LOADED: {
            return {
                ...state,
                selectedHero: {
                    ...state.selectedHero,
                    benchmarks: action.payload,
                    benchmarkError: null
                }
            }
        }
        case HERO_BENCHMARKS_ERROR: {
            return {
                ...state,
                selectedHero: {
                    ...state.selectedHero,
                    benchmarks: null,
                    benchmarkError: action.payload
                }
            }
        }
        case HERO_BENCHMARKS_REQUESTED: {
            return {
                ...state,
                selectedHero: {
                    ...state.selectedHero,
                    benchmarks: null,
                    benchmarkError: null,
                }
            }
        }
        case GAME_DURATION_REQUESTED:
            return {
                ...state,
                selectedHero: {
                    ...state.selectedHero,
                    gameDurations: null,
                    gameDurationsError: null,
                }
            }
        case GAME_DURATION_ERROR:
            return {
                ...state,
                selectedHero: {
                    ...state.selectedHero,
                    gameDurations: null,
                    gameDurationsError: action.payload
                }
            }
        case GAME_DURATION_LOADED:
            return {
                ...state,
                selectedHero: {
                    ...state.selectedHero,
                    gameDurations: action.payload,
                    gameDurationsError: null
                }
            }

        default:
            return state;
    }
}


export default heroReducer;