import React from "react";


const PlayerStatsFallback = ({content, error}) => {

    error && console.error(error);

    return (
        <div className="text-center" style={{margin: "10px 0px"}}>
            <h5 className="text-warning">
                {
                    content
                }
            </h5>
        </div>
    )
};


export default PlayerStatsFallback;