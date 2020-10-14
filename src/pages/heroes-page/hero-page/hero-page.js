import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import OpenDotaServiceContext from "../../../components/context/openDotaContext";
import {fetchHero} from "../../../store/action-creators/hero-actions";
import {getImageURL} from "../../../common/utils";


import Loading from "../../../components/loading";
import Breadcrumbs from "../../../components/breadcrumbs";
import ConditionalDisplay from "../../../components/conditional-display/conditional-display";
import CommonFallback from "../../../components/fallback/common-fallback";
import HeroAvatar from "../../../components/hero-components/hero-avatar";
import HeroBasicInfo from "../../../components/hero-components/hero-basic-info";
import HeroStats from "../../../components/hero-components/hero-stats";
import HeroDetailsTable from "../../../components/hero-components/hero-details-table";

import NotFoundException from "../../../common/error/not-found";

import styled from 'styled-components';

import "./hero-page.css"


const HeroPage = (heroInfo) => {
    console.log(heroInfo);

    return (
        <div>
            <div className="jumbotron">
            <ImageBackground link={getImageURL(heroInfo.img)}>
                <div className="hero-preview-padding">
                    <div className="row justify-content-center align-items-center">
                        <HeroAvatar {...heroInfo}/>
                        <HeroBasicInfo {...heroInfo} additionalStyle="image-bg-inside col-lg col-sm"/>
                        <HeroStats heroInfo={heroInfo} additionalStyle="col col-sm"/>
                    </div>
                </div>
            </ImageBackground>
            </div>
            <div className="text-center">
                <HeroDetailsTable {...heroInfo}/>
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
                        title: hero["localized_name"],
                        isActive: true
                    },
                ]}/>
                <HeroPage {...hero}/>
            </div>
        </ConditionalDisplay>
    )
}

const HeroWrapper = (props) => {

    const {heroId} = props.match.params;

    const service = useContext(OpenDotaServiceContext)
    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchHero(heroId, service)), [heroId])

    const selectedHero = useSelector(({heroes}) => heroes.selectedHero)

    return <HeroContainer {...selectedHero}/>
};


export default HeroWrapper;
