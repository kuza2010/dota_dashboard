import React from "react";

import {Route, Switch} from "react-router-dom";

import HomePage from "../../pages/home-page";
import Heroes from "../../pages/heroes";

import "./main.css"


const Main = () => {
    return (
        <Switch>
            <Route exact
                   path={'/'}
                   component={HomePage}/>
            <Route exact
                   path={'/heroes'}
                   component={Heroes}/>
            <Route path={'*'}
                   render={() => <div>404 Not Found</div>}/>
        </Switch>
    );
}


export default Main;