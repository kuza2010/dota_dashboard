import React from "react";

import Shapes from "../../../common/shape"

import HeroCard from "../hero-card";

import {stringCompare} from "../../../common/utils";

import "./hero-grid.css"


const HeroGrid = ({heroes}) => {

    const renderedHeroes = heroes
        .sort((a, b) => stringCompare(a.localized_name, b.localized_name))
        .map(hero => {
            return (<HeroCard {...hero} key={hero.name}/>);
        });

    return (
        <div className="jumbotron background-default">
            <div className="row">
                {renderedHeroes}
            </div>
        </div>
    );
}

HeroGrid.propTypes = {
    heroes: Shapes.heroStatsShape,
}


export default HeroGrid;