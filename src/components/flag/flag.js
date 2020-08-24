import React from "react";

import PropTypes from "prop-types"

import {getCountryFlag} from "../../common/utils";

import "./flag.css"


const Flag = ({flagCode, alt}) => {

    const flagLink = getCountryFlag(flagCode);

    return (
        <img
            className="flag"
            src={flagLink}
            alt={alt}
        />
    )
};

Flag.propTypes = {
    flagCode: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

Flag.defaultProps = {
    alt: "country-flag",
}


export default Flag;