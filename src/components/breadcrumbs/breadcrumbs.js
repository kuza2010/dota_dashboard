import React from "react";

import {NavLink} from "react-router-dom";

import "./breadcrumbs.css";

const Breadcrumbs = ({crumbs}) => {

    const renderedLinks = crumbs.map(link => {
        const {path, title, isActive} = link;

        return (
            <li key={`link_to-${path}`}
                className={`breadcrumb-item ${isActive ? "active" : null}`}
            >
                {
                    !isActive
                        ? (
                            <NavLink to={path}>
                                <text className="text-success">
                                    {title}
                                </text>
                            </NavLink>
                        ) : (
                            <text className="text-muted">
                                {title}
                            </text>
                        )
                }
            </li>
        );
    })

    return (
        <ol className="breadcrumb ">
            {renderedLinks}
        </ol>
    );
}

export default Breadcrumbs;