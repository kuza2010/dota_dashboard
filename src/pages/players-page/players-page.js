import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import PropTypes from 'prop-types';

import OpenDotaServiceContext from "../../components/context/openDotaContext";

import Breadcrumbs from "../../components/breadcrumbs";
import Loading from "../../components/loading";

import countryCodes from "../../common/country-codes"

import {fetchPlayers} from "../../store/action-creators/player-actions";

import "./players-page.css"


const PlayersPage = ({players, loading, error}) => {

    return (
        <div className="container">
            <Breadcrumbs crumbs={[
                {
                    path: "/",
                    title: "Home",
                    isActive: false
                },
                {
                    title: "Players",
                    isActive: true
                },
            ]}/>
            Player page
            {
                !players || !players.length ?
                    <Loading/> :
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Nickname</th>
                            <th>Position</th>
                            <th>Rating</th>
                            <th>Last game</th>
                            <th>Team</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="table-active">
                            <th>
                                <img
                                    src={countryCodes[0].image}
                                    style={{height: 21.3, width: 32}}
                                />
                                Nickname
                            </th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                        </tr>
                        </tbody>
                    </table>
            }
        </div>
    )
}

PlayersPage.propTypes = {
    players: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
}


/**
 * Container for PlayersPage component
 */
const PlayersPageContainer = () => {

    const openDotaService = useContext(OpenDotaServiceContext);
    const dispatch = useDispatch();

    const players = useSelector(state => state.players.players);
    const error = useSelector(state => state.players.error);
    const loading = useSelector(state => state.players.loading);

    useEffect(() => fetchPlayers(openDotaService, dispatch), []);

    return (
        <PlayersPage
            players={players}
            loading={loading}
            error={error || null}
        />
    )

}


export default PlayersPageContainer;