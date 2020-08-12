import React, {useState} from "react";

import PropTypes from 'prop-types';

import './table-filter.css'


const TableFilter = ({setTableFilterValue, initialValue, filteredRowsLength}) => {

    const [filterValue, setFilterValue] = useState(initialValue);

    const placeholderValue = filteredRowsLength ? `${filteredRowsLength} records...` : "Search...";

    return (
        <div className="float-right search-margin">
            <form className="form-inline my-2 my-lg-0">
                 <span>
                     <input
                         className="form-control mr-sm-2"
                         type="text"
                         onChange={(e) => {
                             setFilterValue(e.target.value);
                             setTableFilterValue(e.target.value);
                         }}
                         value={filterValue || ""}
                         placeholder={placeholderValue}
                     />
                 </span>
            </form>
        </div>
    )
}

TableFilter.propTypes = {
    setTableFilterValue: PropTypes.func.isRequired,
    initialValue: PropTypes.string,
    filteredRowsLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

TableFilter.defaultProps = {
    filteredRowsLength: undefined,
    initialValue: "",
}


export default TableFilter;