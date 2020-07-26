import React from "react";

import HeroCard from "../hero-card";

import {stringCompare} from "../../../common/utils";

import "./hero-grid.css"


const HeroGrid = ({heroes}) => {

    const renderedHeroes = heroes
        .sort((a, b) => stringCompare(a.localized_name, b.localized_name))
        .map(hero => {
            return (
                <HeroCard
                    key={hero.localized_name}
                    image={`https://api.opendota.com${hero.img}`}
                    name={hero.localized_name}
                />
            );
        });

    return (
        <div className="row">
            {renderedHeroes}
        </div>
    );
}


export default HeroGrid;