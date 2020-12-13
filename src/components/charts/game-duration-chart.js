import React from "react";

import {Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis} from "recharts";

import {getChartColorsByName} from "../../common/utils";
import {chartColor, gridStrokeColor} from "../../common/enum";

import {withResizeDetector} from "react-resize-detector";

const GameDurationChart = ({data, width, height}) => {
    return (
        <div>
            <BarChart
                width={width}
                height={400}
                data={data}
            >
                <CartesianGrid strokeDasharray="1 1" stroke={gridStrokeColor}/>
                <XAxis dataKey="duration" interval={1}/>
                <YAxis/>
                <Bar dataKey="games">
                    {
                        data.map(({winRate, duration}) => {
                            const {stroke, gradient} = winRate >= 50
                                ? getChartColorsByName(chartColor.POSITIVE)
                                : getChartColorsByName(chartColor.NEGATIVE)
                            return (
                                <Cell key={`cell-${duration}`}
                                      stroke={stroke}
                                      fill={gradient}
                                      strokeWidth={1}
                                />
                            )
                        })
                    }
                </Bar>
            </BarChart>
        </div>
    )
}

export default withResizeDetector(GameDurationChart);