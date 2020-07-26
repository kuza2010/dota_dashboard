import React, {useContext, useEffect, useState} from "react";

import Breadcrumbs from "../../components/breadcrumbs";
import HeroGrid from "../../components/hero-components/hero-grid";

import OpenDotaServiceContext from "../../components/context/openDotaContext";

import "./heroes-page.css"


const HeroesPage = () => {

    const openDotaService = useContext(OpenDotaServiceContext);

    useEffect(() => {
        openDotaService.getHeroStats().then(heroes => {
            setPending(false);
            setHeroes([...heroes]);
        })
    }, []);

    const [isPending, setPending] = useState(true);
    const [heroes, setHeroes] = useState([]);


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
            {isPending ?
                <h1>Loading ...</h1> :
                <HeroGrid heroes={heroes}/>
            }
        </div>
    );
}


export default HeroesPage;