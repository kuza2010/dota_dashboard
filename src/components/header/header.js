import React from "react";

import {NavLink} from "react-router-dom";

import logo from "../../assets/site-logo.png";

import "./header.css"


const Header = () => {

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container border force-container-padding">
                <NavLink className="navbar-brand"
                         to="/">
                    <img className="site-logo"
                         src={logo}
                         alt="site-logo"/>
                </NavLink>
                <HeaderLinks/>
            </div>
        </nav>
    );
}

const HeaderLinks = () => {
    return (
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link"
                             to="/">
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link"
                             to="/players">
                        Pro players
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link"
                             to="/heroes">
                        Heroes
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link"
                             to="/teams">
                        Teams
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}


export default Header;