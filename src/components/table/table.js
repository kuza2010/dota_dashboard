import React from "react";

import PropTypes from 'prop-types';

import {useGlobalFilter, usePagination, useTable} from "react-table";

import Paginator from "../paginator";
import TableFilter from "./table-filter";

import {filterPlugin} from "../../common/utils";

import "./table.css"


const Table = ({filter, table, paginator}) => {
    return (
        <React.Fragment>
            {filter}
            {table}
            {paginator}
        </React.Fragment>
    )
}


const TableWrapper = ({data, columns, initialState, withFilter, globalFilter}) => {
    const plugins = filterPlugin([withFilter ? useGlobalFilter : undefined, usePagination,]);
    const tableOptions = {
        columns,
        data,
        initialState: {...initialState},
        globalFilter,
    }

    const {
        state, headerGroups, getTableProps, getTableBodyProps, prepareRow,  // common props
        page, pageCount, gotoPage,                                          // pagination
        preGlobalFilteredRows, setGlobalFilter,                             // filtering
    } = useTable({...tableOptions}, ...plugins);

    const filter = withFilter
        ? (<TableFilter setTableFilterValue={setGlobalFilter} filteredRowsLength={preGlobalFilteredRows.length}/>)
        : null;

    const table = (
        <table {...getTableProps()} className="table table-hover">
            {renderTableHead(headerGroups)}
            {renderTableBody(getTableBodyProps(), page, prepareRow)}
        </table>
    );

    const paginator = (
        <Paginator
            pageCount={pageCount}
            currentPageIndex={state.pageIndex}
            goToPage={gotoPage}
        />
    );

    return <Table filter={filter} table={table} paginator={paginator}/>;
}

TableWrapper.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    initialState: PropTypes.object.isRequired,
    withFilter: PropTypes.bool,
    globalFilter: PropTypes.func,               // global filter function, it must be momoized
}

TableWrapper.propTypes = {
    withFilter: false,
    globalFilter: () => {
    },                     // if the function is not provide will use default filter function from table-filter, see: https://react-table.tanstack.com/docs/api/useGlobalFilter
}


function renderTableHead(headerGroups) {
    return (
        <thead>
        {
            headerGroups.map(header => (
                <tr {...header.getHeaderGroupProps()}>
                    {
                        header.headers
                            .map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))
                    }
                </tr>
            ))
        }
        </thead>);
}

function renderTableBody(bodyProps, rows, prepareRow) {
    return (
        <tbody {...bodyProps}>
        {
            rows.map(row => {
                prepareRow(row);
                return (
                    <tr
                        className="table-secondary"
                        {...row.getRowProps()}
                    >
                        {row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )
            })
        }
        </tbody>
    );
}


export default TableWrapper;