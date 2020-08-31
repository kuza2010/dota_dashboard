import React from "react";

import Flag from "../../flag";

import PropTypes from 'prop-types';

import "./player-header.css"
import {playerTeamShape} from "../../../common/shape/shape";


const PlayerHeader = ({avatar, nickname, countryCode, rank, team, estimateRank}) => {
    const playerAvatar = (
        <div className="col-lg-3 col-md-4 col-sm-6 text-center">
            <img alt="player-avatar" src={avatar}/>
        </div>
    );

    const playerInfo = (
        <div className="col-lg-9 col-md-8 col-sm-6">
            <h2>{nickname}</h2>
            <p className="lead">Country: <Flag flagCode={countryCode}/></p>
            {
                rank
                    ? <p className="lead">Rank: {rank}</p>
                    : estimateRank
                    ? <p className="lead">Rank: {estimateRank}</p>
                    : null
            }
            {team && <p className="lead">Team: {team.name}</p>}
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
    ]),
    team: playerTeamShape,
};

PlayerHeader.defaultProps = {
    rank: null,
    team: null,
}


export default PlayerHeader;