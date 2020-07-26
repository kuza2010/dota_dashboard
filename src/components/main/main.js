import React from "react";

import {Route, Switch} from "react-router-dom";

import HomePage from "../../pages/home-page";
import HeroesPage from "../../pages/heroes";

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
            <Route path={'*'}
                   render={() => <div>404 Not Found</div>}/>
        </Switch>
    );
}


export default Main;