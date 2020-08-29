import React from "react";

import PropTypes from "prop-types"


const PlayerNotFoundFallback = ({accountId}) => {
    return (
        <div className="text-center">
            <h2 className="text-warning">
                <br/>
                Sorry, but we <strong>can't find</strong> player with id {`${accountId}`}. Or something went wrong.
            </h2>
        </div>
    )
};

PlayerNotFoundFallback.propTypes = {
    accountId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};


export default PlayerNotFoundFallback;