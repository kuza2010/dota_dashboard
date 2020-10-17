import React from "react";

import PropTypes from "prop-types"

import NotFoundException from "../../common/exception/not-found-exception";


const PlayerNotFoundFallback = ({accountId, error}) => {
    console.error(error)
    return (
        <div className="text-center">
            <h2 className="text-warning">
                <br/>
                {
                    error instanceof NotFoundException
                        ? <>Sorry, but we <strong>can't find</strong> player with id {`${accountId}`}.</>
                        : <strong className="text-danger">Something went wrong :(</strong>
                }
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