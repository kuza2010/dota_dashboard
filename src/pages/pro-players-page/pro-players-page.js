import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import PropTypes from 'prop-types';

import Breadcrumbs from "../../components/breadcrumbs";
import Loading from "../../components/loading";
import Table from "../../components/table";
import Flag from "../../components/flag";

import {fetchPlayers} from "../../store/action-creators/pro-player-actions";

import matchSorter from "match-sorter"

import {getTimeFromNow} from "../../common/utils";
import Shapes from "../../common/shape"

import useOpenDotaService from "../../components/hoc/service-hoc";

import {playerSelectors} from "../../store/selectors";

import "./pro-players-page.css"


const PlayersPage = ({players, loading, error}) => {

    const columns = React.useMemo(() => [
        {
            Header: "Nickname",
            accessor: "name",
            Cell: ({row}) => {
                const {original: player} = row;
                return (
                    <React.Fragment>
                        <Flag alt={`flag-${player["country_code"]}`} flagCode={player["country_code"]}/>
                        <Link to={`player/${player["account_id"]}`}>
                            {player.name}
                        </Link>
                    </React.Fragment>
                )
            },
        },
        {
            Header: "Last game",
            accessor: "last_match_time",
            Cell: ({row}) => (getTimeFromNow(row.original["last_match_time"], "YYYY-MM-DDTHH:mm")),
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
    players: PropTypes.arrayOf(Shapes.proPlayerShape),
    loading: PropTypes.bool,
    error: PropTypes.object,
}


/**
 * Container for PlayersPage component
 */
const PlayersPageContainer = () => {

    const service = useOpenDotaService()
    const dispatch = useDispatch();

    const players = useSelector(playerSelectors.GET_ALL_PLAYERS);
    const error = useSelector(playerSelectors.GET_PLAYERS_ERROR);
    const loading = useSelector(playerSelectors.GET_PLAYERS_LOADING);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fetchPlayers(service, dispatch), []);

    return (
        <PlayersPage
            players={players}
            loading={loading}
            error={error || null}
        />
    )

}


export default PlayersPageContainer;