import React from "react";

import Breadcrumbs from "../../components/breadcrumbs";

import "./heroes.css"

const Heroes = () => {

    return (
        <div className="container">
            <Breadcrumbs
                links={[
                    {
                        path: "/",
                        title: "Home",
                        isActive: false
                    },
                    {
                        title: "Heroes",
                        isActive: true
                    },
                ]}
            />
            <div className="jumbotron background-default">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2">
                        Hero-1
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Heroes;