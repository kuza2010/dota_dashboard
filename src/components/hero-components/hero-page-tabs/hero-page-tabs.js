import React, {useState} from "react";

import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import HeroBenchmarks from "../hero-benchmarks";

import {heroPageTabs} from "../../../common/enum";

import GameDuration from "../game-duration/game-duration";

import "./hero-page-tabs.css"


const HeroPageTabs = ({heroId, activeTabIndex = heroPageTabs.heroDuration.value}) => {
    const [tabIndex, setTabIndex] = useState(activeTabIndex);
    return (
        <div className="margin_top_10">
            <Tabs
                selectedIndex={tabIndex}
                onSelect={index => setTabIndex(index)}
            >
                <TabList className="nav justify-content-center pills-border">
                    {
                        Object.values(heroPageTabs).map(({name}, idx) => {
                            const activeStyle = idx === tabIndex ? "active-tab" : ""
                            return (
                                <Tab
                                    key={name}
                                    className={`pointer nav-link ${activeStyle}`}
                                >
                                    {name}
                                </Tab>
                            )
                        })
                    }
                </TabList>

                <TabPanel className="tab-panel-margin">
                    <HeroBenchmarks heroId={heroId}/>
                </TabPanel>
                <TabPanel>
                    <GameDuration heroId={heroId}/>
                </TabPanel>
            </Tabs>
        </div>
    )
}


export default HeroPageTabs