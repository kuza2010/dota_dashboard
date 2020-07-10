import React from 'react';

import {HashRouter} from "react-router-dom";

import Header from "../header";
import Main from "../main";
import Footer from "../footer";


const App = () => {
    return (
        <HashRouter>
            <Header/>
            <Main/>
            <Footer/>
        </HashRouter>
    );
}


export default App;
