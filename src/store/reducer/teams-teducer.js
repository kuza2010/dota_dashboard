import {TEAMS_FETCH_FAILURE, TEAMS_FETCH_SUCCESSFUL, TEAMS_REQUESTED} from "../actions/teams-actions";

const allTeamsInitialState = {
    teams: [],
    loading: true,
    error: null,
}
const initialState = {
    allTeams: allTeamsInitialState,
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEAMS_REQUESTED:
            return {
                ...state,
                allTeams: allTeamsInitialState,
            }
        case TEAMS_FETCH_SUCCESSFUL:
            return {
                ...state,
                allTeams: {
                    teams: action.payload,
                    loading: false,
                    error: null,
                }
            }
        case TEAMS_FETCH_FAILURE:
            return {
                ...state,
                allTeams: {
                    teams: [],
                    loading: false,
                    error: action.payload,
                }
            }
        default:
            return initialState;
    }
}


export default teamReducer;