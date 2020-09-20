import React from "react";

import PropTypes from "prop-types"

import "./hero-basic-info.css"

/**
 * Represent common hero info like as:
 *  - hero name;
 *  - attack type;
 *  - available position (roles);
 */
const HeroBasicInfo = ({localizedName, attackType, roles, additionalStyle}) => {
    return (
        <div className={additionalStyle}>
            <div>
                <h2 className="hero-name-bold">{localizedName}</h2>
                <p className="hero-basic-info">
                    <span>{attackType.toString().concat(" - ").toUpperCase()}</span>
                    <span className="text-muted">{roles.join("-").toUpperCase()}</span>
                </p>
            </div>
        </div>
    )
}

HeroBasicInfo.propTypes = {
    localizedName: PropTypes.string.isRequired,
    attackType: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    additionalStyle: PropTypes.string,
}

HeroBasicInfo.defaultProps = {
    additionalStyle: null,
}


export default HeroBasicInfo;