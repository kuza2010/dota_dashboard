import React from "react";

import {useTable} from "react-table";

import "./table.css"


const Table = ({data, columns}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data});

    return (
        <table
            className="table table-hover"
            {...getTableProps()}
        >
            <thead>{renderTableHead(headerGroups)}</thead>
            <tbody {...getTableBodyProps()}>{renderTableBody(rows, prepareRow)}</tbody>
        </table>
    )
}


function renderTableHead(headerGroups) {
    return headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
            {
                headerGroup.headers
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