import React from "react";


const ConditionalDisplay = ({condition, fallback, children}) => {
    return condition ? children : fallback;
}


export default ConditionalDisplay;