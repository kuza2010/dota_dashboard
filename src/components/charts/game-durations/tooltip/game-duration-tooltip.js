import React from "react";

import "./game-duration-tooltip.css"

const GameDurationToolTip = ({active, payload}) => {
    if (active) {
        if (Array.isArray(payload) && payload.length > 0) {
            const {duration, winRate, games} = payload[0].payload
            return (
                <div className="game-duration-content">
                    <div className="d-block">
                    <span
                        className="font-weight-bold game-duration-shadow-text">Game duration:</span> {`${duration} minutes`}
                    </div>
                    <div className="d-block">
                        <span className="font-weight-bold game-duration-shadow-text">Games:</span> {`${games}`}
                    </div>
                    <div className="d-block">
                        <span className="font-weight-bold game-duration-shadow-text">Win rate:</span> {`${winRate}%`}
                    </div>
                </div>
            )
        }
    }
    return null
}

export default GameDurationToolTip;