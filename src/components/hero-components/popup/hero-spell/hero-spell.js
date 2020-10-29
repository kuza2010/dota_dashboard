import React from "react";
import PropTypes from "prop-types"

import styled from 'styled-components';

import {getImageURL, getSpellDamageTypeColor, getSpellImmunityColor} from "../../../../common/utils";

import Popup from "reactjs-popup";
import Border from "../../../border";

import "./hero-spell.css"


const SpellInfoPopup = ({abilityId, ability, popupDelay, children}) => {
    // popup styles like: opendota.com
    const popupContentStyle = {
        width: "300px",
        background: "linear-gradient(135deg, rgb(19, 21, 25), rgb(31, 34, 40))",
        border: "2px solid rgb(39,41,43)",
        boxShadow: "",
        overflow: "hidden",
        padding: "0pxs",
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
            <React.Fragment>
                <PopupHeaderBlurEffect link={getImageURL(ability.img)}/>
                <div className="align-items-center position-relative">
                    <PopupSpellHeader {...ability}/>
                    <Border/>
                    <PopupSpellAttribute {...ability}/>
                    <Border/>
                </div>
            </React.Fragment>
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


const PopupHeaderBlurEffect = styled.div`
        position: absolute;
        left: -10px;
        top: 50%;
        height: 100%;
        width: 20%;
        transform: scale(4);
        filter: blur(15px);
        background: no-repeat, url(${props => props.link}) transparent;
        background-repeat: no-repeat;
    `

const PopupSpellHeader = ({dname: spellName, img}) => {
    const imgLink = getImageURL(img);

    return (
        <div className="row force_0_margin padding_5 align-items-center">
            <img
                className="rounded-5 padding-3"
                src={imgLink}
                alt={`${spellName}-description`}
            />
            <div className="col-lg">
                <h6 className="text-uppercase popup_title_font">
                    {spellName}
                </h6>
            </div>
        </div>
    )
}

const PopupSpellAttribute = ({behavior, dmg_type, bkbpierce}) => {
    const spellTarget = typeof behavior === "string"
        ? behavior
        : [...behavior].filter(value => !!value).join(" / ")

    return (
        <div className="padding_13">
            <div>
                <span className="popup_spell_target_label">TARGET:</span>
                {' '}
                <span className="font-weight-500">{`${spellTarget}`}</span>
            </div>

            {
                dmg_type &&
                <div>
                    <span className="popup_spell_target_label">DAMAGE TYPE:</span>
                    {' '}
                    <span
                        style={{color: `${getSpellDamageTypeColor(dmg_type)}`}}
                        className="font-weight-500"
                    >
                        {`${dmg_type}`}
                    </span>
                </div>
            }
            {
                bkbpierce &&
                <div>
                    <span className="popup_spell_target_label">PIERCES SPELL IMMUNITY:</span>
                    {' '}
                    <span
                        style={{color: `${getSpellImmunityColor(bkbpierce)}`}}
                        className="font-weight-500"
                    >
                        {`${bkbpierce}`}
                    </span>
                </div>
            }
        </div>
    )
}


export default SpellInfoPopup;