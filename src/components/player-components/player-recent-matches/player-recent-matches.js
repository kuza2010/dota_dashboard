import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import PropTypes from "prop-types";

import OpenDotaServiceContext from "../../context/openDotaContext";
import {fetchFullStats} from "../../../store/action-creators/player-stats";

import TableWrapper from "../../table";
import ConditionalDisplay from "../../conditional-display/conditional-display";
import {PlayerStatsFallback} from "../../fallback";
import Loading from "../../loading";

import moment from "moment";

import "./player-recent-matches.css"
import Popup from "reactjs-popup";


const PlayerRecentMatches = ({matches}) => {

    const columns = React.useMemo(() => [
        {
            Header: "Hero",
            accessor: (originalRow, rowIndex) => {
                const {player} = originalRow;

                return (
                    <img
                        className="player-match-hero-icon"
                        src={player.heroImage}
                        alt={`${player.heroName}_icon`}
                    />
                );
            },
        },
        {
            Header: "Result",
            accessor: (originalRow, rowIndex) => {
                const {player, startTime} = originalRow;
                const {isRadiant, radiantWin} = player;

                let isWin;
                if (isRadiant) isWin = radiantWin;
                else isWin = !radiantWin;

                return isWin
                    ? <span className="text-muted"> <b
                        className="win">Win</b> <br/>{moment(new Date(startTime * 1000)).fromNow()} </span>
                    : <span className="text-muted"> <b
                        className="lose">Lose</b> <br/>{moment(new Date(startTime * 1000)).fromNow()}</span>
            },
        },
        {
            Header: "Teams",
            accessor: (originalRow, rowIndex) => {
                const {radiantTeam, direTeam} = originalRow;
                return <span> {radiantTeam.tag} <br/> <b>vs</b> {direTeam.tag}</span>
            },
        },
        {
            Header: "League",
            accessor: "league",
        },
        {
            Header: "KDA",
            accessor: (originalRow, rowIndex) => {
                const {player} = originalRow;
                const {kills, assists, deaths} = player;

                const sum = kills + assists + deaths;
                const killPercent = Math.round(kills / sum * 100)
                const deathsPercent = Math.round(deaths / sum * 100)
                const assistPercent = Math.round(assists / sum * 100)

                return (
                    <React.Fragment>
                        <span> {kills}/{deaths}/{assists}</span>
                        <div className="progress progress-small">
                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{width: `${killPercent}%`}}
                                aria-valuenow={killPercent}
                                aria-valuemin="0"
                                aria-valuemax={sum}
                            />
                            <div
                                className="progress-bar bg-danger"
                                role="progressbar" style={{width: `${deathsPercent}%`}}
                                aria-valuenow={deathsPercent}
                                aria-valuemin="0"
                                aria-valuemax={sum}
                            />
                            <div className="progress-bar bg-light"
                                 role="progressbar"
                                 style={{width: `${assistPercent}%`}}
                                 aria-valuenow={assistPercent}
                                 aria-valuemin="0"
                                 aria-valuemax={sum}
                            />
                        </div>
                    </React.Fragment>
                )
            },
        },
    ], []);

    const tableInitialState = React.useMemo(() => ({pageSize: 25,}), [])

    return (
        <div>
            <h4>Recent matches:</h4>
            {
                matches && matches.length > 0
                    ? (
                        <TableWrapper
                            columns={columns}
                            data={matches}
                            initialState={tableInitialState}
                        />
                    )
                    : (
                        <div className="shrink">
                            <Popup
                                contentStyle={{background: "", border: "", boxShadow: ""}}
                                arrow={false}
                                mouseEnterDelay={200}
                                position="right center"
                                on="hover"
                                trigger={(
                                    <div className="row">
                                        <h2 className="text-warning">No matches...</h2>
                                        <div className="align-self-center">
                                            <span className="circle-border text-muted">&nbsp;?&nbsp;</span>
                                        </div>
                                    </div>)}
                            >
                                <div className="alert alert-primary">
                                    We can't find any pro scene matches for this player or this player has not professional
                                    matches yet...
                                </div>
                            </Popup>
                        </div>
                    )
            }
        </div>
    )
};

const PlayerRecentMatchesContainer = (props) => {
    const {error, loading} = props;

    return (
        <ConditionalDisplay
            fallbackCondition={error}
            fallback={
                <PlayerStatsFallback
                    content={(
                        <>
                            <br/>
                            Sorry, but we <strong>can't load</strong> last player matches.
                        </>
                    )}
                    error={error}
                />
            }
        >
            {
                loading
                    ? <Loading/>
                    : <PlayerRecentMatches {...props}/>
            }
        </ConditionalDisplay>
    )
}

const PlayerRecentMatchesWrapper = ({matchIdsArray, accountId}) => {

    const openDotaService = useContext(OpenDotaServiceContext);
    const dispatch = useDispatch();

    useEffect(() => fetchFullStats(matchIdsArray, accountId)(openDotaService, dispatch), []);

    const fullStat = useSelector(({playerStats}) => playerStats.fullStat);

    return <PlayerRecentMatchesContainer {...fullStat}/>
}

PlayerRecentMatchesWrapper.propTypes = {
    matchIdsArray: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ])).isRequired,
    accountId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
};


export default PlayerRecentMatchesWrapper;