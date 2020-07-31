import React from "react";

import Breadcrumbs from "../../components/breadcrumbs";

import "./players-page.css"


const PlayersPage = () => {
    return (
        <div className="container">
            <Breadcrumbs crumbs={[
                {
                    path: "/",
                    title: "Home",
                    isActive: false
                },
                {
                    title: "Players",
                    isActive: true
                },
            ]}/>
            Player page
        </div>
    )
}


export default PlayersPage;