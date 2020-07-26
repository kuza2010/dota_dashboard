import React, {useState} from "react";

import {Link} from "react-router-dom";

import "./hero-card.css"


const HeroCard = ({image, name}) => {

    const [isMouseOver, setMouseOver] = useState(false);

    return (
        <Link to="/">
            <div
                onMouseOver={() => setMouseOver(state => !state)}
                onMouseOut={() => setMouseOver(state => !state)}
                className="position-relative"
            >
                <img className="hero-grid-icon"
                     src={image}
                     alt={name}
                />
                <div className={`position-absolute hero-grid-title ${isMouseOver ? "selected" : "unselected"}`}>
                    {name}
                </div>
            </div>
        </Link>
    );
}


export default HeroCard;