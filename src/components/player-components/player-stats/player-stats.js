import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import PropTypes from "prop-types";

import OpenDotaServiceContext from "../../context/openDotaContext";
import {fetchRecentPlayerMatchesStats} from "../../../store/action-creators/player-stats";

import GameRoles from "../game-roles";
import ConditionalDisplay from "../../conditional-display/conditional-display";
import {CommonFallback} from "../../fallback";
import PlayerRecentMatches from "../player-recent-matches";
import Loading from "../../loading";

import Shape from "../../../common/shape";

import "./player-stats.css"


const PlayerStats = ({recentMatches, accountId}) => {

    const {stats, error, loading} = recentMatches;
    const matchIds = stats.map(match => match.matchId);

    return (
        <ConditionalDisplay
            fallbackCondition={error}
            fallback={<CommonFallback/>}
        >
            <GameRoles {...recentMatches}/>
            {
                loading
                    ? <Loading/>
                    : <PlayerRecentMatches accountId={accountId} matchIdsArray={matchIds}/>
            }
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fetchRecentPlayerMatchesStats(accountId)(openDotaService, dispatch), []);

    const playerStats = useSelector(({playerStats}) => playerStats);

    return (
        <PlayerStats recentMatches={playerStats.recentMatches} accountId={accountId}/>
    )
}


export default PlayerStatsWrapper;