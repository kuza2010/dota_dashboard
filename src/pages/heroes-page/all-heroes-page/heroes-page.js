import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {fetchHeroes} from "../../../store/action-creators/hero-actions";

import HeroGrid from "../../../components/hero-components/hero-grid";
import Loading from "../../../components/loading";
import Breadcrumbs from "../../../components/breadcrumbs";

import OpenDotaServiceContext from "../../../components/context/openDotaContext";

import PropTypes from 'prop-types';
import Shapes from "../../../common/shape"

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

HeroesPage.propTypes = {
    heroes: Shapes.heroStatsShape,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
}

HeroesPage.defaultProps = {
    error: null,
};


/**
 * Wrapper for HeroPage component
 */
const HeroPageContainer = () => {

    const openDotaService = useContext(OpenDotaServiceContext);
    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchHeroes(openDotaService)), []);

    const heroes = useSelector(state => state.heroes.allHeroes.heroes);
    const loading = useSelector(state => state.heroes.allHeroes.loading);
    const error = useSelector(state => state.heroes.allHeroes.error);

    return (
        <HeroesPage
            heroes={heroes}
            loading={loading}
            error={error || null}
        />
    );
}


export default HeroPageContainer;