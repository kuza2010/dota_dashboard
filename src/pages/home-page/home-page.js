import React from "react";

import Badge from "../../components/badge";

import gh from "../../assets/icon-svg/github-icon.svg"
import fork from "../../assets/icon-svg/fork.svg"
import steam from "../../assets/icon-svg/steam-logo.svg"

import "./home-page.css"


const HomePage = () => {
    return (
        <div>
            <Logo/>
            <div className="container">
                <div className="jumbotron background-default">
                    <h1>Hello</h1>
                </div>
            </div>
        </div>
    );
}

const Logo = () => {
    return (
        <div className="splash bg-dark">
            <div className="container">
                <h1 className="display-4 text-center">
                    DOTA2 DASHBOARD
                </h1>
                <div className="row">
                    <div className="badge-centered">
                        <Badge image={gh}
                               link="https://github.com/kuza2010"
                               text="Github"/>
                        <Badge image={fork}
                               link="https://github.com/kuza2010"
                               text="Fork"/>
                        <Badge image={steam}
                               link="https://www.opendota.com/"
                               text="Powered on Open Dota Api"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;