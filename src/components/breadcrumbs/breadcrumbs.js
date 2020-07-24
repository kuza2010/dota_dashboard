import React from "react";

import {NavLink} from "react-router-dom";

const Breadcrumbs = ({crumbs}) => {

    const renderedLinks = crumbs.map(link => {
        const {path, title, isActive} = link;

        return (
            <li key={`link_to-${path}`}
                className={`breadcrumb-item ${isActive ? "active" : null}`}
            >
                {
                    !isActive ?
                        <NavLink to={path}>
                            {title}
                        </NavLink> :
                        title
                }
            </li>
        );
    })

    return (
        <ol className="breadcrumb">
            {renderedLinks}
        </ol>
    );
}

export default Breadcrumbs;