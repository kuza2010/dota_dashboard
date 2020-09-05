import {TEAMS_FETCH_FAILURE, TEAMS_FETCH_SUCCESSFUL, TEAMS_REQUESTED} from "../actions/teams-actions"
import {filterTeams} from "../../common/utils";


const teamsRequested = () => {
    return {
        type: TEAMS_REQUESTED
    }
}

const teamsLoaded = (teams) => {
    return {
        type: TEAMS_FETCH_SUCCESSFUL,
        payload: teams,
    }
}

const teamsError = (error) => {
    return {
        type: TEAMS_FETCH_FAILURE,
        payload: error
    }
}

const fetchTeams = (openDotaService) => (dispatch) => {
    dispatch(teamsRequested());
    openDotaService.getTeams()
        .then(teams => dispatch(teamsLoaded(filterTeams(teams))))
        .catch(error => dispatch(teamsError(error)));
}


export {
    fetchTeams,
}
