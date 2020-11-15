import React, {useContext, useEffect, useMemo} from "react";
import PropTypes from "prop-types"
import {fetchHeroBenchmarks} from "../../../store/action-creators/hero-actions";
import {useDispatch, useSelector} from "react-redux";

import ConditionalDisplay from "../../conditional-display/conditional-display";
import Loading from "../../loading";
import Chart from "../../chart/chart";
import {CommonFallback} from "../../fallback";

import OpenDotaServiceContext from "../../context/openDotaContext";

import {selectedHeroSelectors} from "../../../store/selectors";

import "./hero-benchmarks.css"
import {chunkArray, prepareDataForHeroBenchmarks, prepareDataForHeroBenchmarksChart} from "../../../common/utils";


const HeroBenchmarks = ({benchmark, chartSetting}) => {
    const {chartInOneLine, height} = chartSetting

    const chunkedChartsData = prepareDataForHeroBenchmarksChart(benchmark);
    const memoizedChunkedChartsData = useMemo(() => chunkArray(chunkedChartsData, chartInOneLine), [])

    return (
        <React.Fragment>
            {
                memoizedChunkedChartsData.map((dataChunk, idx) => {
                    return (
                        <div
                            key={`chart-row-${idx}`}
                            className="row text-center"
                        >
                            {
                                dataChunk.map(chunk => {
                                    return (
                                        <div
                                            className="col-lg col-md-6 padding-8"
                                            key={chunk.label.toLowerCase()}
                                        >
                                            <Chart data={chunk.data}
                                                   style={{width: "100%", height: height}}
                                                   chartColors={chunk.chartColor}
                                            />
                                            <span className="float-right text-warning">
                                                <p className="hero-benchmark-chart-sign-text">
                                                    {chunk.label}
                                                </p>
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

HeroBenchmarks.propType = {
    benchmark: PropTypes.object.isRequired,
    chartSetting: PropTypes.object,
}

HeroBenchmarks.defaultProps = {
    chartSetting: {
        chartInOneLine: 2,
        height: 250,
    },
}


const HeroBenchmarksContainer = ({benchmark, error}) => {
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
                benchmark === undefined || benchmark === null
                    ? <Loading/>
                    : <HeroBenchmarks benchmark={benchmark}/>
            }
        </ConditionalDisplay>
    )
}

const HeroBenchmarksWrapper = ({heroId}) => {
    const service = useContext(OpenDotaServiceContext)
    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchHeroBenchmarks(heroId, service)), [heroId])

    const heroBenchmarks = useSelector(selectedHeroSelectors.GET_BENCHMARKS)
    const error = useSelector(selectedHeroSelectors.GET_BENCHMARKS_ERROR)

    return <HeroBenchmarksContainer benchmark={heroBenchmarks} error={error}/>
}

HeroBenchmarksWrapper.propTypes = {
    heroId: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number
    ]).isRequired
}


export default HeroBenchmarksWrapper