import React from "react";

//{column: {filterValue, preFilteredRows, setFilter}
const DefaultFilter = ({rows, setGlobalFilter}) => {
    const count = rows.length

    return (
        <input
            onChange={e => {
                setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records ;)`}
        />
    )
}


export default DefaultFilter