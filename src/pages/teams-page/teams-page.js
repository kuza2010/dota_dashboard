import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Shape from "../../common/shape"

import Breadcrumbs from "../../components/breadcrumbs";
import ConditionalDisplay from "../../components/conditional-display/conditional-display";
import TableWrapper from "../../components/table";
import Loading from "../../components/loading";
import {CommonFallback} from "../../components/fallback";

import OpenDotaServiceContext from "../../components/context/openDotaContext";
import {fetchTeams} from "../../store/action-creators/teams-actions";

import matchSorter from "match-sorter"

import {colForTeamsTable} from "./team-page-helper";

import "./teams-page.css"


const TeamsPage = ({teams}) => {

    const columns = React.useMemo(() => [...colForTeamsTable], []);

    const tableInitialState = React.useMemo(() => ({
        pageIndex: 0,
        pageSize: 25,
    }), []);

    const globalFilter = React.useMemo(() => (rows, fields, filterValue) => {
        return matchSorter(rows, filterValue, {
            keys: [row => row.original["name"]],
        });
    }, []);


    return (
        <div>
            <TableWrapper
                columns={columns}
                initialState={tableInitialState}
                data={teams}
                filterProps={{
                    globalFilter,
                }}
            />
        </div>
    )
};

TeamsPage.propTypes = {
    teams: Shape.teamsShape,
};


const TeamContainer = (props) => {
    const {loading: isLoading, error: isError} = props;

    const teams = (
        <ConditionalDisplay
            fallback={<CommonFallback content="Something went wrong!"/>}
            fallbackCondition={isError}
        >
            <TeamsPage {...props}/>
        </ConditionalDisplay>
    )

    return (
        <div className="container">
            <Breadcrumbs crumbs={[
                {
                    path: "/",
                    title: "Home",
                    isActive: false
                },
                {
                    title: "Teams",
                    isActive: true
                },
            ]}/>
            {
                isLoading
                    ? <Loading/>
                    : teams
            }
        </div>
    )
}


const TeamWrapper = () => {

    const openDotaService = useContext(OpenDotaServiceContext);
    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchTeams(openDotaService)), []);

    const teams = useSelector(({teams}) => teams.allTeams);

    return TeamContainer({...teams})
}


export default TeamWrapper;