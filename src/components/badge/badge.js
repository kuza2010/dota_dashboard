import React from "react";

import "./badge.css"

const Badge = ({image, text, link}) => {
    return (
        <span className="badge badge-white badge-margin">
            <img src={image}
                 alt="github-icon"
                 className="small-icon badge-icon"/>
            <a href={link}>
                {text}
            </a>
        </span>
    );
}

export default Badge;