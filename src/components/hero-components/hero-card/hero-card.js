import React, {useState} from "react";

import {Link} from "react-router-dom";

import {baseApiURL} from "../../../common/enum";

import "./hero-card.css"


const HeroCard = ({img, localized_name, id}) => {

    const [isMouseOver, setMouseOver] = useState(false);

    return (
        <Link to="/">
            <div
                onMouseOver={() => setMouseOver(state => !state)}
                onMouseOut={() => setMouseOver(state => !state)}
                className={`position-relative overlay-container ${isMouseOver ? "overlay-hover" : ""}`}
            >
                <div className={`overlay-block ${isMouseOver ? "overlay-hover" : ""}`}/>
                <img className="hero-grid-icon"
                     src={`${baseApiURL}${img}`}
                     alt={localized_name}
                />
                <div className={`position-absolute hero-grid-title ${isMouseOver ? "selected" : "unselected"}`}>
                    {localized_name}
                </div>
            </div>
        </Link>
    );
}


export default HeroCard;