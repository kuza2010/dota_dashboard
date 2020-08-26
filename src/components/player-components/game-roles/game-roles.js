import React from "react";

import PropTypes from "prop-types"
import {commonStatsShape} from "../../../common/shape/shape";


import {calculateRolesInPercent} from "../../../common/utils";

import "./game-roles.css"


const GameRoles = ({carry, mid, offlane, support}) => {

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
};


const GameRoleContainer = ({stats, loading}) => {
    let carry, mid, offlane, support;

    if (loading) {
        carry = "loading...";
        mid = "loading...";
        offlane = "loading...";
        support = "loading...";
    } else {
        const percentage = calculateRolesInPercent(stats);
        carry = percentage.carry;
        mid = percentage.mid;
        offlane = percentage.offlane;
        support = percentage.support;
    }

    return <GameRoles carry={carry} mid={mid} offlane={offlane} support={support} />
};

GameRoleContainer.propTypes = {
    stats: commonStatsShape.isRequired,
    loading: PropTypes.bool.isRequired,
};


export default GameRoleContainer;