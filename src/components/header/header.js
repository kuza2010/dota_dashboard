import React from "react";

import logo from "../../assets/site-logo.png";

import "./header.css"


const Header = () => {

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container border">
                <a className="navbar-brand"
                   href="#">
                    <img src={logo}
                         className="site-logo"
                         alt="site-logo"/>
                </a>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link"
                               href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                               href="#">
                                Pro players
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                               href="#">
                                Heroes
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                               href="#">
                                Teams
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}


export default Header;