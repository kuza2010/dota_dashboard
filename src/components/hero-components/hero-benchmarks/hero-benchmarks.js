import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types"
import {fetchHeroBenchmarks} from "../../../store/action-creators/hero-actions";
import {useDispatch, useSelector} from "react-redux";

import OpenDotaServiceContext from "../../context/openDotaContext";

import {selectedHeroSelectors} from "../../../store/selectors";

import "./hero-benchmarks.css"


const HeroBenchmarks = ({benchmark, error}) => {
    console.log("HeroBenchmarks data: ", benchmark, error)
    return (
        <div>
            {
                benchmark == null
                    ? "LOADING"
                    : "LOADED"
            }
        </div>
    )
}


const HeroBenchmarksWrapper = ({heroId}) => {
    const service = useContext(OpenDotaServiceContext)
    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchHeroBenchmarks(heroId, service)), [heroId])

    const heroBenchmarks = useSelector(selectedHeroSelectors.GET_BENCHMARKS)
    const error = useSelector(selectedHeroSelectors.GET_BENCHMARKS_ERROR)

    return <HeroBenchmarks benchmark={heroBenchmarks} error={error}/>
}

HeroBenchmarksWrapper.propTypes = {
    heroId: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number
    ]).isRequired
}


export default HeroBenchmarksWrapper