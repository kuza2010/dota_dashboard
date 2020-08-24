import React from "react";

import PropTypes from "prop-types"


const PlayerPageFallback = ({accountId}) => {
    return (
        <div className="text-center">
            <h2 className="text-danger">
                <br/>
                Sorry, but we <strong>can't find</strong> player with id {`${accountId}`} :(
            </h2>
        </div>
    )
};

PlayerPageFallback.propTypes = {
    accountId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};


export default PlayerPageFallback;