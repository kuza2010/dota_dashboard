import React from "react";

import "./not-found.css"


const NotFound = (props) => {
    const {match: {url}} = props;
    return (
        <div className="container not-found-margin align-self-center text-center text-muted">
            <h1 className="display-3">404 Not Found</h1>
            <p>Are you sure that you search <strong>{url}</strong></p>
        </div>
    )
}

export default NotFound;