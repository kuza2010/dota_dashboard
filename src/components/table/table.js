import React from "react";

import PropTypes from 'prop-types';

import {usePagination, useTable} from "react-table";

import Paginator from "../paginator";

import "./table.css"


const Table = ({data, columns, initialState}) => {

    const {
        state: {pageIndex, pageSize},
        headerGroups,
        getTableProps,
        getTableBodyProps,
        prepareRow,
        page,
        pageOptions,
        pageCount,
        gotoPage,
    } = useTable({columns, data, initialState: {...initialState}}, usePagination);

    const table = (
        <table className="table table-hover"{...getTableProps()}>
            <thead>{renderTableHead(headerGroups)}</thead>
            <tbody {...getTableBodyProps()}>{renderTableBody(page, prepareRow)}</tbody>
        </table>
    )

    const pagination = (
        <Paginator
            pageCount={pageCount}
            pageSize={pageSize}
            currentPageIndex={pageIndex}
            goToPage={gotoPage}
        />
    );

    return (
        <React.Fragment>
            {table}
            {pagination}
        </React.Fragment>
    )
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    initialState: PropTypes.object.isRequired,
}

function renderTableHead(tableHeader) {
    return tableHeader.map(header => (
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

function renderTableBody(rows, prepareRow) {
    return rows.map(row => {
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


export default Table;