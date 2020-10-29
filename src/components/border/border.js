import React from "react";
import PropTypes from "prop-types"

import styled from 'styled-components';

import "./border.css"


const StyledBorder = styled.div`
            border-top: ${props => props.weightPixel}px solid ${props => props.color}`

const Border = ({color, weightPixel}) =>
    <StyledBorder
        color={color}
        weightPixel={weightPixel}
    />

Border.propTypes = {
    color: PropTypes.string,
    weightPixel: PropTypes.number,
}

Border.defaultProps = {
    color: "#080D15",
    weightPixel: 1,
}


export default Border;
