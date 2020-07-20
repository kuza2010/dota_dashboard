import React from "react";

import "./card.css"

const Card = ({header, image, content, children}) => {
    return (
        <div className="col-lg-4 text-center">
            <div className="card mb-3">
                <h3 className="card-header">
                    {header}
                </h3>
                <div className="card-image">
                    <img src={image}
                         className="advantage extra-icon"
                         alt={`icon: ${image}`}/>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">
                        {content ?
                            content :
                            children}
                    </h6>
                </div>
            </div>
        </div>
    );
}

export default Card;