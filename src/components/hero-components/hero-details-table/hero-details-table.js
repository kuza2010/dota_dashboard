import React, {useState} from "react";

import {
    getAttackSpeed,
    getBaseHeroHealth,
    getBaseHeroMana,
    getHealthRegeneration,
    getHeroArmor,
    getHeroDamage,
    getManaRegeneration
} from "../../../common/utils";

import './hero-details-table.css'


const HeroDetailsTable = ({
                              baseAttackMax, baseAttackMin, attackRange, attackRate, projectileSpeed,
                              baseHealth, baseHealthRegen, baseMana, baseArmor, baseMr, moveSpeed, legs,
                              turnRate, cmEnabled, baseStraight, baseIntellect, baseAgility, primaryAttr
                          }) => {
    let buttonText = 'Show details';
    const [isShown, setIsShown] = useState(true);

    if (!isShown) {
        buttonText = 'Hide details';
    }

    if (cmEnabled) {
        cmEnabled = 'yes';
    } else {
        cmEnabled = 'no';
    }

    return (
        <div className="text-center container">
            <button
                className="hero-details-button btn btn-secondary"
                onClick={() => setIsShown(!isShown)}
            >
                {buttonText}
            </button>
            {!isShown &&
            <div className="hero-details-table row">
                <table className="hero-details-table-one table table-hover table-striped col-md-3">
                    <tbody>
                    <tr>
                        <td align="left">BASE ATTACK:</td>
                        <td>{getHeroDamage(baseAttackMin, baseAttackMax, primaryAttr)}</td>
                    </tr>
                    <tr>
                        <td align="left">ATTACK RANGE:</td>
                        <td>{attackRange}</td>
                    </tr>
                    <tr>
                        <td align="left">ATTACK/SEC:</td>
                        <td>{getAttackSpeed(baseAgility, attackRate)}</td>
                    </tr>
                    {
                        projectileSpeed !== undefined && projectileSpeed > 0 &&
                        <tr>
                            <td align="left">PROJECTILE SPEED:</td>
                            <td>{projectileSpeed}</td>
                        </tr>
                    }
                    </tbody>
                </table>
                <table className="hero-details-table-two table table-hover table-striped col-md-3">
                    <tbody>
                    <tr>
                        <td align="left">HEALTH:</td>
                        <td>{getBaseHeroHealth(baseHealth, baseStraight)}</td>
                    </tr>
                    <tr>
                        <td align="left">HEALTH REGEN:</td>
                        <td>{getHealthRegeneration(baseStraight, baseHealthRegen)}</td>
                    </tr>
                    <tr>
                        <td align="left">MANA:</td>
                        <td>{getBaseHeroMana(baseMana, baseIntellect)}</td>
                    </tr>
                    <tr>
                        <td align="left">MANA REGEN:</td>
                        <td>{getManaRegeneration(baseIntellect)}</td>
                    </tr>
                    </tbody>
                </table>
                <table className="hero-details-table-three table table-hover table-striped col-md-3">
                    <tbody>
                    <tr>
                        <td align="left">BASE ARMOR:</td>
                        <td>{getHeroArmor(baseArmor, baseAgility)}</td>
                    </tr>
                    <tr>
                        <td align="left">MAGIC RESISTANCE:</td>
                        <td>{baseMr}</td>
                    </tr>
                    <tr>
                        <td align="left">MOVE SPEED:</td>
                        <td>{moveSpeed}</td>
                    </tr>
                    <tr>
                        <td align="left">TURN SPEED:</td>
                        <td>{turnRate}</td>
                    </tr>
                    </tbody>
                </table>
                <table className="hero-details-table-four table table-hover table-striped col-md-3">
                    <tbody>
                    <tr>
                        <td align="left">NUMBER OF LEGS:</td>
                        <td>{legs}</td>
                    </tr>
                    <tr>
                        <td align="left">CM ENABLED:</td>
                        <td>{cmEnabled}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>
    )
}


export default HeroDetailsTable;