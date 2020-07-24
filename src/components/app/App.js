import React from 'react';

import {HashRouter} from "react-router-dom";

import Header from "../header";
import Main from "../main";
import Footer from "../footer";

import OpenDotaServiceContext from "../context/openDotaContext";

import OpenDotaService from "../../common/service/openDotaService";


const App = () => {

    return (
        <OpenDotaServiceContext.Provider value={new OpenDotaService()}>
            <HashRouter>
                <Header/>
                <Main/>
                <Footer/>
            </HashRouter>
        </OpenDotaServiceContext.Provider>
    );
}


export default App;
