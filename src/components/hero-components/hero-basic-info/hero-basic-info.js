import React from "react";

import "./hero-basic-info.css"


const HeroBasicInfo = ({localized_name: heroName, attack_type: attackType, roles, additionalStyle}) => {
    return (
        <div className={additionalStyle}>
            <div>
                <h2 className="hero-name-bold">{heroName}</h2>
                <p className="hero-basic-info">
                    <span>{attackType.toString().concat(" - ").toUpperCase()}</span>
                    <span className="text-muted">{roles.join("-").toUpperCase()}</span>
                </p>
            </div>
        </div>
    )
}


export default HeroBasicInfo;