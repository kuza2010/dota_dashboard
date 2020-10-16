import React, {useState} from "react";

import './hero-details-table.css'

const HeroDetailsTable = ({
                              baseAttackMax, baseAttackMin, attackRange, attackRate, projectileSpeed,
                              baseHealth, baseHealthRegen, baseMana, baseManaRegen, baseArmor,
                              magicResistance, moveSpeed, turnRate, legs, cmEnabled
                          }) => {

    const [isShown, setIsShown] = useState(true);
    const toggleFieldset = () => setIsShown(!isShown);

    let buttonText = 'Show details';

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
            <button className="hero-details-button btn btn-secondary" onClick={toggleFieldset}>
                {buttonText}
            </button>
            {!isShown &&
            <div className="hero-details-table row">
                <table className="hero-details-table-one table table-hover table-striped col-md-3">
                    <tbody>
                    <tr>
                        <td align="left">BASE ATTACK:</td>
                        <td>{baseAttackMin} - {baseAttackMax}</td>
                    </tr>
                    <tr>
                        <td align="left">ATTACK RANGE:</td>
                        <td>{attackRange}</td>
                    </tr>
                    <tr>
                        <td align="left">ATTACK SPEED:</td>
                        <td>{attackRate}</td>
                    </tr>
                    <tr>
                        <td align="left">PROJECTILE SPEED:</td>
                        <td>{projectileSpeed}</td>
                    </tr>
                    </tbody>
                </table>

                <table className="hero-details-table-two table table-hover table-striped col-md-3">
                    <tbody>
                    <tr>
                        <td align="left">HEALTH:</td>
                        <td>{baseHealth}</td>
                    </tr>
                    <tr>
                        <td align="left">HEALTH REGEN:</td>
                        <td>{Number(baseHealthRegen)}</td>
                    </tr>
                    <tr>
                        <td align="left">MANA:</td>
                        <td>{baseMana}</td>
                    </tr>
                    <tr>
                        <td align="left">MANA REGEN:</td>
                        <td>{baseManaRegen}</td>
                    </tr>
                    </tbody>
                </table>

                <table className="hero-details-table-three table table-hover table-striped col-md-3">
                    <tbody>
                    <tr>
                        <td align="left">BASE ARMOR:</td>
                        <td>{baseArmor}</td>
                    </tr>
                    <tr>
                        <td align="left">MAGIC RESISTANCE:</td>
                        <td>{magicResistance}</td>
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