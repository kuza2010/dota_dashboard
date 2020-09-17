import React from "react";

import {getImageURL} from "../../../common/utils";

import "./hero-avatar.css"


const HeroAvatar = ({img: avatar, name}) => {
    return (
        <div className="hero-avatar-z-index-top">
            <img
                className="hero-avatar"
                src={getImageURL(avatar)}
                alt={`hero-avatar-${name}`}
            />
        </div>
    )
}


export default HeroAvatar;