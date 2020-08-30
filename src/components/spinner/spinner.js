import React from "react";

import "./spinner.css"


const Spinner = () => {
    return (
        <div className="lds-ripple">
            <div/>
            <div/>
        </div>
    )
};

const SpinnerFacebook = () => {
    return (
        <div className="lds-facebook">
            <div/>
            <div/>
            <div/>
        </div>
    )
}


export {
    SpinnerFacebook,
    Spinner
};