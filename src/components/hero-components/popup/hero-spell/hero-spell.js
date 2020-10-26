import React from "react";
import PropTypes from "prop-types"

import {getImageURL} from "../../../../common/utils";

import Popup from "reactjs-popup";

import "./hero-spell.css"


const SpellInfoPopup = ({
                            popupDelay, abilityId, ability,
                            children
                        }) => {
    // style like: opendota.com
    const popupContentStyle = {
        width: "300px",
        background: "linear-gradient(135deg, rgb(19, 21, 25), rgb(31, 34, 40))",
        border: "2px solid rgb(39,41,43)",
        boxShadow: ""
    };
    const popupArrowStyle = {
        background: "rgb(39,41,43)"
    };

    return (
        <Popup
            contentStyle={popupContentStyle}
            arrowStyle={popupArrowStyle}
            arrow={true}
            mouseEnterDelay={popupDelay}
            position="bottom center"
            on="hover"
            trigger={children}
        >
            <SpellInfoHeader {...ability}/>
        </Popup>
    );
}

SpellInfoPopup.propTypes = {
    ability: PropTypes.object.isRequired,
    popupDelay: PropTypes.number,
}

SpellInfoPopup.defaultProps = {
    popupDelay: 1000,
}


const SpellInfoHeader = ({dname: spellName, img}) => {
    return (
        <div className="popup_header_padding_5">
            <div className="row popup_force_margin align-items-center">
                <img
                    className="rounded-5 padding-5"
                    src={getImageURL(img)}
                    alt={spellName}
                />
                <div className="col-lg">
                    <h6 className="text-uppercase popup_title_font">
                        {spellName}
                    </h6>
                </div>
            </div>
        </div>
    )
}


export default SpellInfoPopup;