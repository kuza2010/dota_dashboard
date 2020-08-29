import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import PropTypes from "prop-types";

import OpenDotaServiceContext from "../../context/openDotaContext";
import {fetchRecentPlayerMatchesStats} from "../../../store/action-creators/player-stats";

import GameRoles from "../game-roles";
import ConditionalDisplay from "../../conditional-display/conditional-display";
import {PlayerStatsFallback} from "../../fallback";
import PlayerRecentMatches from "../player-recent-matches";

import Shape from "../../../common/shape";

import "./player-stats.css"


const PlayerStats = ({recentMatches, accountId}) => {

    const {stats, error} = recentMatches;
    const matchIds = stats.map(match => match.matchId);

    return (
        <ConditionalDisplay
            fallbackCondition={error}
            fallback={<PlayerStatsFallback/>}
        >
            <GameRoles {...recentMatches}/>
            <PlayerRecentMatches accountId={accountId} matchIdsArray={matchIds}/>
        </ConditionalDisplay>
    )
};

PlayerStats.propTypes = {
    recentMatches: Shape.recentMatchesShape.isRequired,
    accountId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

const PlayerStatsWrapper = ({accountId}) => {

    const openDotaService = useContext(OpenDotaServiceContext);
    const dispatch = useDispatch();

    const recentMatches = useSelector(({playerStats}) => playerStats.recentMatches);

    useEffect(() => fetchRecentPlayerMatchesStats(accountId)(openDotaService, dispatch), []);

    return (
        <PlayerStats recentMatches={recentMatches} accountId={accountId}/>
    )
}


export default PlayerStatsWrapper;