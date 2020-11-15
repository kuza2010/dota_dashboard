import React, {useState} from "react";

import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import HeroBenchmarks from "../hero-benchmarks";

import {heroPageTabs} from "../../../common/enum";

import "./hero-page-tabs.css"


const navLinksText = ["Benchmarks", "Durations"]

const HeroPageTabs = ({heroId, activeTabIndex = heroPageTabs.heroBenchmarks}) => {
    const [tabIndex, setTabIndex] = useState(activeTabIndex);

    return (
        <div className="margin_top_10">
            <Tabs
                selectedIndex={tabIndex}
                onSelect={index => setTabIndex(index)}
            >
                <TabList className="nav nav-pills justify-content-center pills-border">
                    {
                        navLinksText.map((text, idx) => {
                            const activeStyle = idx === tabIndex ? "active" : ""
                            return (
                                <Tab
                                    key={text}
                                    className={`pointer nav-link ${activeStyle}`}
                                >
                                    {text}
                                </Tab>
                            )
                        })
                    }
                </TabList>

                <TabPanel className="tab-panel-margin">
                    <HeroBenchmarks heroId={heroId}/>
                </TabPanel>
                <TabPanel>
                    <h2>Duration</h2>
                </TabPanel>
            </Tabs>
        </div>
    )
}


export default HeroPageTabs