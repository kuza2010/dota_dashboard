import React from "react";


const ConditionalDisplay = ({fallbackCondition, fallback, children}) => {
    return fallbackCondition ? fallback : children;
}


export default ConditionalDisplay;