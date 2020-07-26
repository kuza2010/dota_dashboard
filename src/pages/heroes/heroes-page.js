import React, {useContext, useEffect, useState} from "react";

import Breadcrumbs from "../../components/breadcrumbs";
import HeroGrid from "../../components/hero-components/hero-grid";

import OpenDotaServiceContext from "../../components/context/openDotaContext";

import "./heroes-page.css"


const HeroesPage = ({heroes}) => {

    return (
        <div className="container">
            <Breadcrumbs crumbs={[
                {
                    path: "/",
                    title: "Home",
                    isActive: false
                },
                {
                    title: "Heroes",
                    isActive: true
                },
            ]}/>
            <HeroGrid heroes={heroes}/>
        </div>
    );
}

/**
 * Wrapper for HeroPage component
 */
const HeroPageContainer = () => {
    const openDotaService = useContext(OpenDotaServiceContext);

    useEffect(() => {
        openDotaService.getHeroStats()
            .then(heroes => {
                setLoading(false);
                setHeroes([...heroes]);
            })
    }, []);

    const [loading, setLoading] = useState(true);
    const [heroes, setHeroes] = useState([]);

    return loading ?
        "Loading ..." :
        <HeroesPage heroes={heroes}/>;
}


export default HeroPageContainer;