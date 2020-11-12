import React, {useContext, useEffect} from "react";
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
import {chunk, prepareDataForHeroBenchmarks, prepareDataForHeroBenchmarksChart} from "../../../common/utils";


const HeroBenchmarks = ({benchmark, chartSetting}) => {
    const chunkedChartsData = prepareDataForHeroBenchmarksChart(benchmark);

    const axes = React.useMemo(() => [
        {primary: true, type: 'linear', position: 'bottom'},
        {type: 'linear', position: 'left'},
    ], []);
    const memoizedChunkedChartsData = React.useMemo(() =>
        chunk(chunkedChartsData, chartSetting.chartInOneLine), [])

    return (
        <div>
            {
                memoizedChunkedChartsData.map((dataChunk, idx) => {
                    return (
                        <div
                            key={`chart-row-${idx}`}
                            className="row text-center"
                        >
                            {
                                dataChunk.map(data => {
                                    // we need wrap it into array for correct work
                                    return (
                                        <div
                                            className="col-lg col-md-6"
                                            key={data.label.toLowerCase()}
                                        >
                                            <Chart data={[data]} axes={axes}
                                                   style={{
                                                       width: "100%",
                                                       height: `${chartSetting.height}px`
                                                   }}
                                            />
                                            <span className="float-right text-warning">
                                    <p className="hero-benchmark-chart-sign-text">{data.label}</p>
                                </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

HeroBenchmarks.propType = {
    benchmark: PropTypes.object.isRequired,
    chartSetting: PropTypes.object,
}

HeroBenchmarks.defaultProps = {
    chartSetting: {
        chartInOneLine: 3,
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