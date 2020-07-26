import React from 'react';

import {HashRouter} from "react-router-dom";

import {Provider} from "react-redux";
import store from "../../store";

import Header from "../header";
import Main from "../main";
import Footer from "../footer";

import OpenDotaServiceContext from "../context/openDotaContext";

import OpenDotaService from "../../common/service/openDotaService";


const App = () => {

    return (
        <Provider store={store}>
            <OpenDotaServiceContext.Provider value={new OpenDotaService()}>
                <HashRouter>
                    <Header/>
                    <Main/>
                    <Footer/>
                </HashRouter>
            </OpenDotaServiceContext.Provider>
        </Provider>
    );
}


export default App;
