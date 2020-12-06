import React, {useEffect} from "react";

import {useDispatch} from "react-redux";
import {fetchHeroGameDuration} from "../../../store/action-creators/hero-actions";

import useOpenDotaService from "../../hoc/service-hoc";

import "./game-duration.css"


const GameDurationWrapper = ({heroId}) => {
    const service = useOpenDotaService()
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => dispatch(fetchHeroGameDuration(heroId, service)), [heroId])

    return (
        <div>
            DURATION
        </div>
    )
}


export default GameDurationWrapper;

