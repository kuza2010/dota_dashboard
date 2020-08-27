import React from "react";

import PropTypes from "prop-types"
import {commonStatsShape} from "../../../common/shape/shape";

import {calculateRolesInPercent} from "../../../common/utils";

import Spinner from "../../spinner";

import "./game-roles.css"


const GameRoles = ({carry, mid, offlane, support}) => {

    return (
        <React.Fragment>
            <div className="row justify-content-center game-role-margin">
                <RoleItem title="CARRY" content={carry}/>
                <RoleItem title="MID" content={mid}/>
                <RoleItem title="OFFLANE" content={offlane}/>
                <RoleItem title="SUPPORT" content={support}/>
            </div>
            <hr className="stats-divider"/>
        </React.Fragment>
    )
};

const RoleItem = ({title, content}) => {
    return (
        <div className="col-lg-2 text-center">
            {title}
            {
                typeof content === "string"
                    ? <p className="lead-bold lead-shadow">{content}</p>
                    : <div>{content}</div>
            }
        </div>
    )
}


const GameRoleContainer = ({stats, loading}) => {
    let carry, mid, offlane, support;

    if (loading) {
        carry = <Spinner/>;
        mid = <Spinner/>;
        offlane = <Spinner/>;
        support = <Spinner/>;
    } else {
        const percentage = calculateRolesInPercent(stats);
        carry = percentage.carry;
        mid = percentage.mid;
        offlane = percentage.offlane;
        support = percentage.support;
    }

    return <GameRoles carry={carry} mid={mid} offlane={offlane} support={support}/>
};

GameRoleContainer.propTypes = {
    stats: commonStatsShape.isRequired,
    loading: PropTypes.bool.isRequired,
};


export default GameRoleContainer;