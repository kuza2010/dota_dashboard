import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {fetchHeroes} from "../../../store/action-creators/hero-actions";

import HeroGrid from "../../../components/hero-components/hero-grid";
import Loading from "../../../components/loading";
import Breadcrumbs from "../../../components/breadcrumbs";

import PropTypes from 'prop-types';
import Shapes from "../../../common/shape"

import useOpenDotaService from "../../../components/hoc/service-hoc";

import {heroSelectors} from "../../../store/selectors";

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

    const service = useOpenDotaService()
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => dispatch(fetchHeroes(service)), []);

    const heroes = useSelector(heroSelectors.GET_ALL_HEROES);
    const loading = useSelector(heroSelectors.GET_ALL_HEROES_LOADING);
    const error = useSelector(heroSelectors.GET_ALL_HEROES_ERROR);

    return (
        <HeroesPage
            heroes={heroes}
            loading={loading}
            error={error || null}
        />
    );
}


export default HeroPageContainer;