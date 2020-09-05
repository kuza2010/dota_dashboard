import React from "react";

import Breadcrumbs from "../../components/breadcrumbs";

import "./teams-page.css"


const TeamsPage = () => {
    return (
        <div className="container">
            <Breadcrumbs crumbs={[
                {
                    path: "/",
                    title: "Home",
                    isActive: false
                },
                {
                    title: "Teams",
                    isActive: true
                },
            ]}/>
            Teams
        </div>
    )
};


export default TeamsPage;