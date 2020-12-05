import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import PropTypes from "prop-types";
import {fetchRecentPlayerMatchesStats} from "../../../store/action-creators/player-stats";

import GameRoles from "../game-roles";
import ConditionalDisplay from "../../conditional-display/conditional-display";
import {CommonFallback} from "../../fallback";
import PlayerRecentMatches from "../player-recent-matches";
import Loading from "../../loading";

import Shape from "../../../common/shape";

import useOpenDotaService from "../../hoc/service-hoc";

import {playerStatsSelector} from "../../../store/selectors";

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

    const service = useOpenDotaService()
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fetchRecentPlayerMatchesStats(accountId)(service, dispatch), []);

    const playerStats = useSelector(playerStatsSelector.GET_PLAYER_STATS);

    return (
        <PlayerStats recentMatches={playerStats.recentMatches} accountId={accountId}/>
    )
}


export default PlayerStatsWrapper;