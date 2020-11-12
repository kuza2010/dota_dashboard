import React from "react";

import {Chart as ReactChart} from "react-charts";


const Chart = ({data, axes, style}) => {
    return (
        <div style={style}>
            <ReactChart data={data} axes={axes}/>
        </div>
    )
}


export default Chart;