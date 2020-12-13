import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {fetchHeroGameDuration} from "../../../store/action-creators/hero-actions";

import ConditionalDisplay from "../../conditional-display/conditional-display";
import {CommonFallback} from "../../fallback";
import Loading from "../../loading";

import useOpenDotaService from "../../hoc/service-hoc";

import {selectedHeroSelectors} from "../../../store/selectors";

import GameDurationChart from "../../charts/game-durations/game-duration-chart";

import "./game-duration.css"


const GameDuration = ({duration}) => {
    return (
        <div className="row justify-content-center">
            <div className="col">
                <span className="game-duration-info"> Durations</span> data from professional matches
                <GameDurationChart data={duration}/>
            </div>
        </div>
    )
}


const GameDurationContainer = ({duration, error}) => {
    return (
        <ConditionalDisplay
            fallbackCondition={error}
            fallback={
                <CommonFallback
                    error={error}
                    content={
                        <>
                            <br/>
                            {<strong>Sorry something went wrong ... </strong>}
                        </>
                    }
                />
            }
        >
            {
                duration === undefined || duration === null
                    ? <Loading/>
                    : <GameDuration duration={duration}/>
            }
        </ConditionalDisplay>
    )
}

const GameDurationWrapper = ({heroId}) => {
    const service = useOpenDotaService()
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => dispatch(fetchHeroGameDuration(heroId, service)), [heroId])

    const gameDurations = useSelector(selectedHeroSelectors.GET_GAME_DURATION)
    const error = useSelector(selectedHeroSelectors.GET_GAME_DURATION_ERROR)

    return <GameDurationContainer duration={gameDurations} error={error}/>
}


export default GameDurationWrapper;

