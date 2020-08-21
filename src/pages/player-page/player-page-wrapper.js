import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import Breadcrumbs from "../../components/breadcrumbs";
import Loading from "../../components/loading";
import ConditionalDisplay from "../../components/conditional-display/conditional-display";
import PlayerPageFallback from "../../components/fallback";

import {fetchPlayer} from "../../store/action-creators/player-actions";

import OpenDotaServiceContext from "../../components/context/openDotaContext";

import "./player-page.css"

const PlayerPage = ({player, loading, error, accountId}) => {
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
                condition={!error}
                fallback={(<PlayerPageFallback accountId={accountId}/>)}
            >
                {
                    loading
                        ? <Loading/>
                        : `${player.nickname}`
                }
            </ConditionalDisplay>
        </div>
    )
}


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
        <PlayerPage
            player={player}
            loading={loading}
            error={error}
            accountId={accountId}
        />
    );
}


export default PlayerPageWrapper;