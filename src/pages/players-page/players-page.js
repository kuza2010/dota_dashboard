import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import PropTypes from 'prop-types';

import OpenDotaServiceContext from "../../components/context/openDotaContext";

import Breadcrumbs from "../../components/breadcrumbs";
import Loading from "../../components/loading";
import Table from "../../components/table";

import {fetchPlayers} from "../../store/action-creators/player-actions";

import matchSorter from "match-sorter"

import {getCountryFlag, getTimeFromNow} from "../../common/utils";

import "./players-page.css"


const PlayersPage = ({players, loading, error}) => {

    const columns = React.useMemo(() => [
        {
            Header: "Nickname",
            accessor: "name",
            Cell: ({row}) => {
                const {original: player} = row;
                const flagLink = getCountryFlag(player);

                return (
                    <React.Fragment>
                        <img
                            src={flagLink}
                            className="flag"
                            alt={`flag-${player["country_code"]}`}
                        />
                        {player.name}
                    </React.Fragment>
                )
            },
        },
        {
            Header: "Last game",
            accessor: "last_match_time",
            Cell: ({row}) => (getTimeFromNow(row.original["last_match_time"])),
        },
        {
            Header: "Team",
            accessor: "team_name",
        },
    ], []);

    const tableInitialState = React.useMemo(() => (
        {
            pageIndex: 0,
            pageSize: 25,
        }
    ), [])

    const globalFilter = React.useMemo(() => (rows, fields, filterValue) => {
        return matchSorter(rows, filterValue, {
            keys: [
                row => row.values["name"],
                row => row.values["team_name"],
            ],
        });
    }, []);

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
            {
                !players || !players.length
                    ? <Loading/>
                    : <Table
                        columns={columns}
                        data={players}
                        initialState={tableInitialState}
                        filterProps={{
                            globalFilter,
                            popupDelay: 2000,
                            popupText: (<>You can filter it by <strong> nickname and team tag!!!</strong></>)
                        }}
                    />
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