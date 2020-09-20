import React from "react";

import styled from 'styled-components';

import {getImageURL} from "../../../common/utils";
import {AGILITY_COLOR, INTELLECT_COLOR, STRENGTH_COLOR, TRIGGER_SPELL_SIZE} from "../../../common/enum";

import "./hero-stats.css"


const HeroStats = (props) => {
    const {additionalStyle, heroInfo} = props;

    return (
        <div className={additionalStyle}>
            <BaseStats {...heroInfo}/>
            <SpellsAndTalents {...heroInfo}/>
        </div>
    )
}


/**
 * Render colored circle. Just provide property: 'color'
 */
const Dot = styled.div`
    height: 9px;
    width: 9px;
    background-color: ${props => props.color};
    border-radius: 50%;
    display: inline-block;
    `

/**
 * Render base hero stats: strength, agility, intellect
 */
const BaseStats = ({baseStrength, baseIntellect, baseAgility, strGain, intGain, agiGain}) => {
    return (
        <div>
            <div className="row-custom justify-content-center">
                <div className="hero-base-stats-font margin-20">
                    <Dot color={STRENGTH_COLOR}/> {baseStrength} + {strGain}
                </div>
                <div className="hero-base-stats-font margin-20">
                    <Dot color={AGILITY_COLOR}/> {baseAgility} + {agiGain}
                </div>
                <div className="hero-base-stats-font margin-20">
                    <Dot color={INTELLECT_COLOR}/> {baseIntellect} + {intGain}
                </div>
            </div>
        </div>
    )
}

/**
 * Render hero`s spells and talents in one line.
 * Make sure that mana const value is not 'null' and '>' than 0.
 */
const SpellsAndTalents = ({abilitiesAndTalents, name}) => {
    return (
        <div>
            <div className="row justify-content-center">
                {
                    abilitiesAndTalents.abilities.map(ability => {
                        return (
                            <div
                                className="padding-3 position-relative"
                                key={`${name}${ability.dname}${ability.img}`}
                            >
                                <img
                                    className={`rounded-5 ${abilitiesAndTalents.abilities.length > TRIGGER_SPELL_SIZE ? "mini-spell-icon" : null}`}
                                    src={getImageURL(ability.img)}
                                    alt={ability.dname}
                                />
                                {
                                    ability.mc
                                        ? (
                                            <div className="manacost">
                                                {typeof ability.mc === "string"
                                                    ? ability.mc > 0 ? ability.mc : null
                                                    : ability.mc[0] > 0 ? ability.mc[0] : null}
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default HeroStats;