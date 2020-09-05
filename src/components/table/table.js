import React from "react";

import PropTypes from 'prop-types';

import {useGlobalFilter, usePagination, useTable} from "react-table";

import Paginator from "../paginator";
import TableFilter from "./table-filter";

import {filterPlugin} from "../../common/utils";

import Shapes from "../../common/shape";

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


const TableWrapper = ({data, columns, initialState, filterProps}) => {
    const {globalFilter, popupText, popupDelay} = filterProps ? filterProps : {};

    const plugins = filterPlugin([filterProps ? useGlobalFilter : undefined, usePagination,]);
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

    const filter = filterProps
        ? (
            <TableFilter
                setTableFilterValue={setGlobalFilter}
                filteredRowsLength={preGlobalFilteredRows.length}
                popupDelay={popupDelay}
                popupText={popupText}
            />)
        : null;

    const table = (
        <table {...getTableProps()} className="table table-hover">
            {renderTableHead(headerGroups)}
            {renderTableBody(getTableBodyProps(), page, prepareRow)}
        </table>
    );

    const paginator = pageCount >= 2
        ? (
            <Paginator
                pageCount={pageCount}
                currentPageIndex={state.pageIndex}
                goToPage={gotoPage}
            />
        )
        : null

    return <Table filter={filter} table={table} paginator={paginator}/>;
};

TableWrapper.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,            //should be memoized
    initialState: PropTypes.object.isRequired,      //should be memoized
    filterProps: Shapes.tableFilterShape,
};

TableWrapper.defaultProps = {
    filterProps: null,
};

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
                                <td className="center-vertical" {...cell.getCellProps()}>
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