import React, {useContext, useEffect} from "react";

import PropTypes, {bool} from "prop-types";
import {commonStatsShape} from "../../../common/shape/shape";

import {useDispatch, useSelector} from "react-redux";

import OpenDotaServiceContext from "../../context/openDotaContext";
import {fetchStats} from "../../../store/action-creators/player-stats";

import GameRoles from "../game-roles";
import ConditionalDisplay from "../../conditional-display/conditional-display";
import {PlayerStatsFallback} from "../../fallback";

import "./player-stats.css"


const PlayerStats = ({stats, loading, error}) => {

    return (
        <ConditionalDisplay
            fallbackCondition={error}
            fallback={<PlayerStatsFallback/>}
        >
            <GameRoles stats={stats} loading={loading}/>
        </ConditionalDisplay>
    )
};

PlayerStats.propTypes = {
    loading: bool.isRequired,
    stats: commonStatsShape,                // it contains last 20th matched
    error: PropTypes.instanceOf(Error),
}

PlayerStats.defaultProps = {
    stats: [],
    error: null,
}


const PlayerStatsWrapper = ({accountId}) => {

    const openDotaService = useContext(OpenDotaServiceContext);
    const dispatch = useDispatch();

    const stats = useSelector(({stats}) => stats.stats);
    const loading = useSelector(({stats}) => stats.loading);
    const error = useSelector(({stats}) => stats.error);

    useEffect(() => fetchStats(accountId)(openDotaService, dispatch), []);

    return (
        <PlayerStats
            stats={stats}
            loading={loading}
            error={error}
        />
    )
}


export default PlayerStatsWrapper;