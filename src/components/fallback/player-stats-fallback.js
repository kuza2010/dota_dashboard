import React from "react";


const PlayerStatsFallback = () => {
    return (
        <div className="text-center" style={{margin: "10px 0px"}}>
            <h5 className="text-warning">
                Something went wrong during loading player stats.
            </h5>
        </div>
    )
};


export default PlayerStatsFallback;