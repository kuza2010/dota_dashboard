import React from "react";
import {playerShape} from "../../../common/shape/shape";

import PlayerStats from "../../../components/player-components/player-stats";
import PlayerHeader from "../../../components/player-components/player-header";

import "./player-layout.css"


const PlayerLayout = ({player}) => {
    return (
        <div className="jumbotron">
            <PlayerHeader {...player}/>
            <PlayerStats {...player}/>
        </div>
    )
}

PlayerLayout.propTypes = {
    player: playerShape.isRequired,
}


export default PlayerLayout;