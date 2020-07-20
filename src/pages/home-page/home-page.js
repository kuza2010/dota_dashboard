import React from "react";

import Card from "../../components/card/cards";
import Badge from "../../components/badge";

import icons from "../../assets/icon-svg"
import advantages from "../../assets/advantages"

import "./home-page.css"


const HomePage = () => {
    return (
        <div>
            <Logo/>
            <Advantage/>
        </div>
    );
}

//Site logo aka header for home page
const Logo = () => {
    return (
        <div className="splash bg-dark">
            <div className="container">
                <h1 className="display-4 text-center">
                    DOTA2 DASHBOARD
                </h1>
                <div className="row">
                    <div className="badge-centered">
                        <Badge image={icons.gh}
                               link="https://github.com/kuza2010"
                               text="Github"/>
                        <Badge image={icons.fork}
                               link="https://github.com/kuza2010"
                               text="Fork"/>
                        <Badge image={icons.steam}
                               link="https://www.opendota.com/"
                               text="Powered by Open Dota Api"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main content of home page
const Advantage = () => {
    return (
        <div className="container">
            <div className="jumbotron background-default">
                <div className="row">
                    <Card header="Players"
                          image={advantages.players}
                          content="Get the information about your favorite player! You need to know player id."/>
                    <Card header="Teams"
                          image={advantages.teams}
                          content="Get the information about your favorite team! Losses, wins and so on available."/>
                    <Card header="Heroes"
                          image={advantages.heroes}
                          content="Get the information about your favorite hero! Hero-lore also available."/>
                    <Card header="Easy"
                          image={advantages.easyToInstall}
                          content="Do you know everything about Dota2 world? Here you can find everything."/>
                    <Card header="Steam"
                          image={advantages.steam}
                          content="Some dota-related sites needs your steam account. Forget about it."/>
                    <Card header="Open Dota"
                          image={advantages.opendota}>
                        <>
                            This project powered by <a href="https://www.opendota.com/">Opendota </a>
                            and use <a href="https://docs.opendota.com/"> OpenDota Api.</a>
                        </>
                    </Card>
                </div>
            </div>
        </div>
    );
}


export default HomePage;