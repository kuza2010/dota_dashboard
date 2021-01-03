import React from "react";
import {playerShape} from "../../../common/shape/shape";

import PlayerStats from "../../../components/player-components/player-stats";
import PlayerHeader from "../../../components/player-components/player-header";

import "./player-layout.css"


const PlayerLayout = ({player, accountId}) => {
    return (
        <div className="jumbotron margin-bottom-20">
            <PlayerHeader {...player}/>
            <PlayerStats accountId={accountId}/>
        </div>
    )
}

PlayerLayout.propTypes = {
    player: playerShape.isRequired,
}


export default PlayerLayout;