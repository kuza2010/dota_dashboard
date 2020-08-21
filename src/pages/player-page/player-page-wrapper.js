import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import Breadcrumbs from "../../components/breadcrumbs";
import Loading from "../../components/loading";

import {fetchPlayer} from "../../store/action-creators/plyer-actions";

import OpenDotaServiceContext from "../../components/context/openDotaContext";

import "./player-page.css"

/**
 * This page render player by provided id
 * Props should contain 'props.match.accountId' field. It must be number.
 */
const PlayerPage = ({player, loading, error}) => {
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
            {
                loading
                    ? <Loading/>
                    : `${player.nickname}`
            }
        </div>
    )
}


const PlayerPageWrapper = (props) => {

    const openDotaService = useContext(OpenDotaServiceContext);
    const dispatch = useDispatch();

    const player = useSelector(({player}) => player.player);
    const error = useSelector(({player}) => player.error);
    const loading = useSelector(({player}) => player.loading);

    useEffect(() => fetchPlayer(92423451)(openDotaService, dispatch), []);

    return (
        <PlayerPage
            player={player}
            loading={loading}
            error={error || null}
        />
    );
}


export default PlayerPageWrapper;