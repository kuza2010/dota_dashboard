import React from "react";

import PropTypes from 'prop-types';

import "./paginator-button.css"


const PaginatorButton = ({title, disabled, isCurrentPage, onClick}) => {
    return (
        <li className={`page-item ${disabled ? 'disabled' : ''} ${isCurrentPage ? 'active' : ''}`}>
            <button
                className="page-link"
                onClick={disabled ? doNothing : onClick}
            >
                {title}
            </button>
        </li>
    )
}

PaginatorButton.propTypes = {
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,               // the button is disabled
    isCurrentPage: PropTypes.bool,          // the button should be highlights
    onClick: PropTypes.func,
}

PaginatorButton.defaultProps = {
    disabled: false,
    isCurrentPage: false,
    onClick: undefined,
}

function doNothing(e) {
    //do nothing
}


export default PaginatorButton;