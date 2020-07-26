import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {fetchHeroes} from "../../store/action-creators";

import HeroGrid from "../../components/hero-components/hero-grid";
import Loading from "../../components/loading";
import Breadcrumbs from "../../components/breadcrumbs";

import OpenDotaServiceContext from "../../components/context/openDotaContext";

import "./heroes-page.css"


const HeroesPage = ({heroes, loading, error}) => {

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
            {loading ? <Loading/> : <HeroGrid heroes={heroes}/>}
        </div>
    );
}

/**
 * Wrapper for HeroPage component
 */
const HeroPageContainer = () => {

    const openDotaService = useContext(OpenDotaServiceContext);
    const dispatch = useDispatch();
    const {heroes, loading, error} = useSelector(state => state);

    useEffect(() => fetchHeroes(openDotaService, dispatch), []);

    return (
        <HeroesPage
            heroes={heroes}
            error={error || null}
            loading={loading}
        />
    );
}


export default HeroPageContainer;