import React, {useContext, useEffect} from "react";

import PropTypes from 'prop-types';

import {useDispatch, useSelector} from "react-redux";

import Breadcrumbs from "../../components/breadcrumbs";
import Loading from "../../components/loading";
import ConditionalDisplay from "../../components/conditional-display/conditional-display";
import PlayerPageFallback from "../../components/fallback";
import PlayerLayout from "./player-layout";

import {fetchPlayer} from "../../store/action-creators/player-actions";

import OpenDotaServiceContext from "../../components/context/openDotaContext";

import {playerShape} from "../../common/shape/shape";

import "./player-page.css"

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
                    title: "Player",
                    isActive: true
                },
            ]}/>
            <ConditionalDisplay
                fallbackCondition={error}
                fallback={(<PlayerPageFallback accountId={accountId}/>)}
            >
                <PlayerLayout player={player}/>
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

    const player = useSelector(({player}) => player.player);
    const error = useSelector(({player}) => player.error);
    const loading = useSelector(({player}) => player.loading);

    useEffect(() => fetchPlayer(accountId)(openDotaService, dispatch), []);

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