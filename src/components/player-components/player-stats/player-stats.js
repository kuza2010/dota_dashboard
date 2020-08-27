import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import OpenDotaServiceContext from "../../context/openDotaContext";
import {fetchRecentMatches} from "../../../store/action-creators/player-stats";

import GameRoles from "../game-roles";
import ConditionalDisplay from "../../conditional-display/conditional-display";
import {PlayerStatsFallback} from "../../fallback";
import PlayerRecentMatches from "../player-recent-matches";

import Shape from "../../../common/shape";

import "./player-stats.css"


const PlayerStats = ({recentMatches}) => {
    const {stats, loading, error} = recentMatches;

    return (
        <ConditionalDisplay
            fallbackCondition={error}
            fallback={<PlayerStatsFallback/>}
        >
            <GameRoles stats={stats} loading={loading}/>
            <PlayerRecentMatches/>
        </ConditionalDisplay>
    )
};

PlayerStats.propTypes = {
    recentMatches: Shape.recentMatchesShape.isRequired,
}

const PlayerStatsWrapper = ({accountId}) => {

    const openDotaService = useContext(OpenDotaServiceContext);
    const dispatch = useDispatch();

    const recentMatches = useSelector(({playerStats}) => playerStats.recentMatches);

    useEffect(() => fetchRecentMatches(accountId)(openDotaService, dispatch), []);

    return (
        <PlayerStats recentMatches={recentMatches}/>
    )
}


export default PlayerStatsWrapper;