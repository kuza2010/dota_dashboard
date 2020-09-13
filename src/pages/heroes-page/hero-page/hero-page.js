import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import OpenDotaServiceContext from "../../../components/context/openDotaContext";
import {fetchHero} from "../../../store/action-creators/hero-actions";

import Loading from "../../../components/loading";

import "./hero-page.css"
import ConditionalDisplay from "../../../components/conditional-display/conditional-display";
import CommonFallback from "../../../components/fallback/common-fallback";
import NotFoundException from "../../../common/error/not-found";


const HeroPage = (heroInfo) => {

    return (
        <div className="container">
            Hero
        </div>
    )
};


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
            <HeroPage/>
        </ConditionalDisplay>
    )
}

const HeroWrapper = (props) => {

    const {heroId} = props.match.params;
    console.log(heroId)

    const service = useContext(OpenDotaServiceContext)
    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchHero(heroId, service)), [heroId])

    const selectedHero = useSelector(({heroes}) => heroes.selectedHero)
    console.log(selectedHero)

    return <HeroContainer {...selectedHero}/>
};


export default HeroWrapper;
