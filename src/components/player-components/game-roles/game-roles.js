import React from "react";

import {calculateRolesInPercent} from "../../../common/utils";

import "./game-roles.css"


const GameRoles = ({stats}) => {
    const {carry, mid, offlane, support} = calculateRolesInPercent(stats);

    return (
        <React.Fragment>
            <div className="row justify-content-center game-role-margin">
                <div className="col-lg-2 text-center">
                    <>CARRY</>
                    <p className="lead-bold lead-shadow">{carry}</p>
                </div>
                <div className="col-lg-2 text-center">
                    <>MID</>
                    <p className="lead-bold lead-shadow">{mid}</p>
                </div>
                <div className="col-lg-2 text-center">
                    <>OFFLANE</>
                    <p className="lead-bold lead-shadow">{offlane}</p>
                </div>
                <div className="col-lg-2 text-center">
                    <>SUPPORT</>
                    <p className="lead-bold lead-shadow">{support}</p>
                </div>
            </div>
            <hr className="my-66"/>
        </React.Fragment>
    )
}


export default GameRoles;