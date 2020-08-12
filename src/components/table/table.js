import React, {useState} from "react";

import PropTypes from 'prop-types';

import {useAsyncDebounce, useGlobalFilter, usePagination, useTable} from "react-table";

import Paginator from "../paginator";

import "./table.css"
import TableFilter from "./table-filter";


// Define a default UI for filtering
function GlobalFilter({preGlobalFilteredRows, globalFilter, setGlobalFilter,}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
      Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records!!!`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
    </span>
    )
}

const Table = ({data, columns, initialState}) => {

    const [searchValue, setSearchValue] = useState("");

    const filterTypes = React.useMemo(() => ({
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []);

    const {
        state,
        headerGroups,
        prepareRow,
        page,
        pageCount,
        gotoPage,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable({columns, data, initialState: {...initialState}, filterTypes,}, useGlobalFilter, usePagination);

    const table = (
        <table className="table table-hover">
            <thead>{renderTableHead(headerGroups)}</thead>
            <tbody>{renderTableBody(page, prepareRow)}</tbody>
        </table>
    );

    const pagination = (
        <Paginator
            pageCount={pageCount}
            pageSize={state.pageSize}
            currentPageIndex={state.pageIndex}
            goToPage={gotoPage}
        />
    );

    const filter = (
        <TableFilter
            setTableFilterValue={setGlobalFilter}
            filteredRowsLength={preGlobalFilteredRows.length}
        />
    );

    return (
        <React.Fragment>
            {filter}
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
        <tr>
            {
                header.headers.map(column => <th>{column.render('Header')}</th>)
            }
        </tr>
    ))
}

function renderTableBody(rows, prepareRow) {
    return rows.map(row => {
        prepareRow(row);
        return (
            <tr className="table-secondary">
                {
                    row.cells.map(cell => <td>{cell.render('Cell')}</td>)
                }
            </tr>
        )
    })
}


export default Table;