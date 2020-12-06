import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import PropTypes from "prop-types";
import {fetchFullStats} from "../../../store/action-creators/player-stats";

import TableWrapper from "../../table";
import ConditionalDisplay from "../../conditional-display/conditional-display";
import Loading from "../../loading";
import Popup from "reactjs-popup";
import {CommonFallback} from "../../fallback";

import {getTimeFromNow} from "../../../common/utils";

import useOpenDotaService from "../../hoc/service-hoc";

import {playerStatsSelector} from "../../../store/selectors";

import "./player-recent-matches.css"
import {Link} from "react-router-dom";


const PlayerRecentMatches = ({matches}) => {

    const columns = React.useMemo(() => [
        {
            Header: "Hero",
            accessor: (originalRow, rowIndex) => {
                const {player} = originalRow;

                console.log(originalRow)

                return (
                    <Popup
                        contentStyle={{background: "", border: "", boxShadow: ""}}
                        arrow={false}
                        mouseEnterDelay={200}
                        position="right center"
                        on="hover"
                        trigger={(
                            <Link to={`/heroes/${player.heroId}`}>
                                <img
                                    className="player-match-hero-icon"
                                    src={player.heroImage}
                                    alt={`${player.heroName}_icon`}
                                />
                            </Link>
                        )}
                    >
                        <div className="alert alert-primary">
                            Hero: {player.heroName}
                        </div>
                    </Popup>
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
                        className="win">Win</b> <br/>{getTimeFromNow(startTime * 1000)} </span>
                    : <span className="text-muted"> <b
                        className="lose">Lose</b> <br/>{getTimeFromNow(startTime * 1000)}</span>
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
                <CommonFallback
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

    const service = useOpenDotaService()
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fetchFullStats(matchIdsArray, accountId)(service, dispatch), []);

    const fullStat = useSelector(playerStatsSelector.GET_PLAYER_FULL_STATS);

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