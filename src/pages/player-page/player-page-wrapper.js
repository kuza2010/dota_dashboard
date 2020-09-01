import React, {useContext, useEffect} from "react";

import PropTypes from 'prop-types';

import {useDispatch, useSelector} from "react-redux";

import Breadcrumbs from "../../components/breadcrumbs";
import Loading from "../../components/loading";
import ConditionalDisplay from "../../components/conditional-display/conditional-display";
import PlayerLayout from "./player-layout";
import {PlayerNotFoundFallback} from "../../components/fallback";

import {fetchPlayer} from "../../store/action-creators/player-actions";

import OpenDotaServiceContext from "../../components/context/openDotaContext";

import {playerShape} from "../../common/shape/shape";

import "./player-page.css"
import {playerStatsCleanup, playerStatsRequested} from "../../store/action-creators/player-stats";


const PlayerPage = ({player, error, accountId}) => {
    return (
        <div className="container">
            <Breadcrumbs crumbs={[
                {
                    path: "/",
                    title: "Home",
                    isActive: false
                },
                {
                    path: "/players",
                    title: "Players",
                    isActive: false,
                },
                {
                    title: player.nickname ? `Players ${player.nickname}` : "Player",
                    isActive: true
                },
            ]}/>
            <ConditionalDisplay
                fallbackCondition={error}
                fallback={(<PlayerNotFoundFallback accountId={accountId} error={error}/>)}
            >
                <PlayerLayout player={player} accountId={accountId}/>
            </ConditionalDisplay>
        </div>
    )
};

PlayerPage.propTypes = {
    accountId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    player: PropTypes.oneOfType([
        playerShape,                        // data fetched successfully
        PropTypes.object,                   // {} in error case
    ]).isRequired,
    error: PropTypes.instanceOf(Error),
};

PlayerPage.defaultProps = {
    error: null,
};


/**
 * This page render player by provided id
 * Props should contain 'props.match.accountId' field. It must be number.
 */
const PlayerPageWrapper = (props) => {

    const {match: {params: {accountId}}} = props;

    const openDotaService = useContext(OpenDotaServiceContext);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchPlayer(accountId)(openDotaService, dispatch)
        return () => dispatch(playerStatsCleanup());
    }, [accountId]);

    const player = useSelector(({player}) => player.player);
    const error = useSelector(({player}) => player.error);
    const loading = useSelector(({player}) => player.loading);

    return (
        loading
            ? <Loading/>
            : <PlayerPage
                player={player}
                error={error}
                accountId={accountId}
            />);
}


export default PlayerPageWrapper;