import React from "react";

import {Route, Switch} from "react-router-dom";

import HomePage from "../../pages/home-page";
import HeroesPage from "../../pages/heroes-page/all-heroes-page";
import PlayersPage from "../../pages/pro-players-page";
import PlayerPageWrapper from "../../pages/player-page";
import TeamsPage from "../../pages/teams-page";
import NotFound from "../not-found";


import "./main.css"

const Main = () => {
    return (
        <Switch>
            <Route exact
                   path={'/'}
                   component={HomePage}/>
            <Route exact
                   path={'/heroes'}
                   component={HeroesPage}/>
            <Route exact
                   path={'/players'}
                   component={PlayersPage}/>
            <Route path={'/player/:accountId(\\d+)'}
                   component={PlayerPageWrapper}/>
            <Route exact
                   path={'/teams'}
                   component={TeamsPage}/>
            <Route path={'*'}
                   render={NotFound}/>
        </Switch>
    );
}


export default Main;