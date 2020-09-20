import React from "react";

import {getTimeFromNow} from "../../common/utils";


export const colForTeamsTable = [
    {
        Header: "Team",
        accessor: (team) => {
            return (
                <div>
                    <img
                        className="team-logo"
                        alt={`team-${team.tag}-logo`}
                        src={team.logo}
                    />
                    {team.name}
                </div>
            );
        },
    },
    {
        Header: "Rating",
        accessor: (team) => {
            return Math.floor(team.rating);
        },
    },
    {
        Header: "Win/Lose",
        accessor: (team) => {
            return (
                <React.Fragment>
                    Win:<span className="text-green"><strong>{team.wins}</strong></span>
                    <br/>
                    Lose:<span className="text-danger"><strong>{team.losses}</strong></span>
                </React.Fragment>
            )
        },
    },
    {
        Header: "Last match time",
        accessor: (team) => {
            const {lastMatchTime} = team;
            return getTimeFromNow(lastMatchTime * 1000);
        },
    }
];