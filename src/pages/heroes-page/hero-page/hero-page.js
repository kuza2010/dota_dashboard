import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import OpenDotaServiceContext from "../../../components/context/openDotaContext";
import {fetchHero} from "../../../store/action-creators/hero-actions";

import Loading from "../../../components/loading";
import Breadcrumbs from "../../../components/breadcrumbs";
import ConditionalDisplay from "../../../components/conditional-display/conditional-display";
import CommonFallback from "../../../components/fallback/common-fallback";

import NotFoundException from "../../../common/error/not-found";

import styled from 'styled-components';

import "./hero-page.css"
import {getImageURL} from "../../../common/utils";


const HeroPage = (heroInfo) => {

    return (
        <div className="container">
            <Breadcrumbs crumbs={[
                {
                    path: "/",
                    title: "Home",
                    isActive: false
                },
                {
                    path: "/heroes",
                    title: "Heroes",
                    isActive: false
                },
                {
                    title: heroInfo["localized_name"],
                    isActive: true
                },
            ]}/>
            <div className="jumbotron">
                <ImageBackground
                    link={getImageURL(heroInfo.img)}
                >
                    <div className="image-bg-inside text-center">
                        <p>Hello 12</p>
                        <p>Hello 12</p>
                        <p>Hello 12</p>
                    </div>
                </ImageBackground>
                Hero {heroInfo.localized_name}
            </div>
        </div>
    )
};


const ImageBackground = styled.div`
        position: relative;
        &:before {
          content: "";
          position: absolute;
          width: 100%; height: 100%;
          background-repeat: no-repeat;
          background-image: url(${props => props.link});
          background-size: 100%;
          filter: blur(10px);
          object-fit: cover;
        }`;

const HeroContainer = ({hero, loading, error}) => {
    if (loading) {
        return <Loading/>
    }

    return (
        <ConditionalDisplay
            fallbackCondition={error}
            fallback={(
                <CommonFallback
                    error={error}
                    content={
                        <>
                            <br/>
                            {
                                error instanceof NotFoundException
                                    ? <>Sorry, but we <strong>can't find</strong> hero with id {error.extra}</>
                                    : <strong>Sorry something went wrong </strong>
                            }
                        </>
                    }
                />
            )}
        >
            <HeroPage {...hero}/>
        </ConditionalDisplay>
    )
}

const HeroWrapper = (props) => {

    const {heroId} = props.match.params;

    const service = useContext(OpenDotaServiceContext)
    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchHero(heroId, service)), [heroId])

    const selectedHero = useSelector(({heroes}) => heroes.selectedHero)
    console.log(selectedHero)

    return <HeroContainer {...selectedHero}/>
};


export default HeroWrapper;
