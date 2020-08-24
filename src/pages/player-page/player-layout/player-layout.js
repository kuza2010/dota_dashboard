import React from "react";

import Flag from "../../../components/flag";

import "./player-layout.css"


const PlayerLayout = ({player}) => {

    const playerAvatar = (
        <div className="col-lg-3 col-md-4 col-sm-6 text-center">
            <img alt="player-avatar" src={player.avatar}/>
        </div>
    );

    const playerInfo = (
        <div className="col-lg-9 col-md-8 col-sm-6">
            <h2>{player.nickname}</h2>
            <p className="lead">Country: <Flag flagCode={player.countryCode}/></p>
            <p className="lead">Rank: {player.rank}</p>
            <p className="lead">Team: {player.team.name}</p>
        </div>
    );

    return (
        <div className="jumbotron">
            <div className="row">
                {playerAvatar}
                {playerInfo}
            </div>
        </div>
    )
}


export default PlayerLayout;