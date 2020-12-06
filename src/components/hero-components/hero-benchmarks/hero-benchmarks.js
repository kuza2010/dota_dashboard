import React, {useEffect, useMemo} from "react";

import {fetchHeroBenchmarks} from "../../../store/action-creators/hero-actions";
import {useDispatch, useSelector} from "react-redux";

import PropTypes from "prop-types"
import Shapes from "../../../common/shape";

import ConditionalDisplay from "../../conditional-display/conditional-display";
import Loading from "../../loading";
import BenchmarkChart from "../../charts/benchmark-chart";
import {CommonFallback} from "../../fallback";
import {selectedHeroSelectors as selector} from "../../../store/selectors";
import {chunkArray, prepareDataForHeroBenchmarksChart} from "../../../common/utils";

import "./hero-benchmarks.css"
import useOpenDotaService from "../../hoc/service-hoc";


const HeroBenchmarks = ({benchmark, chartSetting}) => {
    const {chartInOneLine, height} = chartSetting

    const memoizedChunkedChartsData = useMemo(() => {
            const chunkedChartsData = prepareDataForHeroBenchmarksChart(benchmark);
            return chunkArray(chunkedChartsData, chartInOneLine)
        },
        [benchmark, chartInOneLine]
    )

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
                                            <BenchmarkChart
                                                data={chunk.data}
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
    // PropTypes.object.isRequired
    benchmark: Shapes.heroBenchmarksShape.isRequired,
    chartSetting: Shapes.chartSettingsShape,
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
    const service = useOpenDotaService()
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => dispatch(fetchHeroBenchmarks(heroId, service)), [heroId])

    const heroBenchmarks = useSelector(selector.GET_BENCHMARKS)
    const error = useSelector(selector.GET_BENCHMARK_ERROR)

    return <HeroBenchmarksContainer benchmark={heroBenchmarks} error={error}/>
}

HeroBenchmarksWrapper.propTypes = {
    heroId: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number
    ]).isRequired
}


export default HeroBenchmarksWrapper