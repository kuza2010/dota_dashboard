import React from "react";

import Flag from "../../flag";

import PropTypes from 'prop-types';

import "./player-header.css"
import {playerTeamShape} from "../../../common/shape/shape";


const PlayerHeader = ({avatar, nickname, countryCode, rank, team}) => {
    const playerAvatar = (
        <div className="col-lg-3 col-md-4 col-sm-6 text-center">
            <img alt="player-avatar" src={avatar}/>
        </div>
    );

    const playerInfo = (
        <div className="col-lg-9 col-md-8 col-sm-6">
            <h2>{nickname}</h2>
            <p className="lead">Country: <Flag flagCode={countryCode}/></p>
            <p className="lead">Rank: {rank}</p>
            <p className="lead">Team: {team.name}</p>
        </div>
    );

    return (
        <div className="row">
            {playerAvatar}
            {playerInfo}
        </div>
    )
};

PlayerHeader.propTypes = {
    avatar: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    rank: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    team: playerTeamShape,
};


export default PlayerHeader;