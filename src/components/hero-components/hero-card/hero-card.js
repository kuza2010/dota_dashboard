import React from "react";

import "./hero-card.css"
import {Link} from "react-router-dom";

const HeroCard = ({image, name}) => {
    return (
        <Link to="/">
            <div className="position-relative">
                <img className="hero-grid-icon"
                     src={image}
                     alt={name}
                />
                <div className="position-absolute her-grid-title">
                    {name}
                </div>
            </div>
        </Link>
    );
}

export default HeroCard;