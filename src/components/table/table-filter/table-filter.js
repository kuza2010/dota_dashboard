import React, {useState} from "react";
import PropTypes from 'prop-types';

import Popup from "reactjs-popup";

import {useAsyncDebounce} from "react-table";

import './table-filter.css'


const TableFilter = ({setTableFilterValue, initialValue, filteredRowsLength, popupText, popupDelay}) => {
    const [filterValue, setFilterValue] = useState(initialValue);
    const placeholderValue = filteredRowsLength ? `${filteredRowsLength} records...` : 'Search...';
    const onChange = useAsyncDebounce(value => {
        setTableFilterValue(value || undefined);
    }, 200);

    return (
        <div className="float-right search-margin">
            <form className="form-inline my-2 my-lg-0">
                 <span>
                     <Popup
                         contentStyle={{background: "", border: "", boxShadow: ""}}
                         arrow={false}
                         mouseEnterDelay={popupDelay}
                         position="left top"
                         on="hover"
                         trigger={
                             <input
                                 className="form-control mr-sm-2"
                                 type="text"
                                 onChange={(e) => {
                                     setFilterValue(e.target.value);
                                     onChange(e.target.value);
                                 }}
                                 value={filterValue}
                                 placeholder={placeholderValue}
                             />
                         }
                     >
                         <div className="alert alert-primary">
                             {popupText}
                         </div>
                     </Popup>
                 </span>
            </form>
        </div>
    )
}

TableFilter.propTypes = {
    setTableFilterValue: PropTypes.func.isRequired,
    initialValue: PropTypes.string,
    filteredRowsLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    popupText: PropTypes.string,
    popupDelay: PropTypes.number,
}

TableFilter.defaultProps = {
    filteredRowsLength: undefined,
    initialValue: "",
    popupText: "Use this filter for filtering rows",
    popupDelay: 0,
}


export default TableFilter;