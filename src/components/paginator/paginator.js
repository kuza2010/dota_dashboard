import React from "react";

import PropTypes from 'prop-types';

import PaginatorButton from "./paginator-button";

import './paginator.css'

/**
 * Represent paginator buttons
 * @param pageCount - total page
 * @param currentPageIndex - current page index
 * @param goToPage - func to handle paginate
 *
 * @Note keep in mind that currentPageIndex start from value 0 !
 */
const Paginator = ({pageCount, currentPageIndex, goToPage}) => {

    const firstPage = currentPageIndex >= 1
        ? <PaginatorButton title="&laquo;" onClick={() => goToPage(0)}/>
        : null;

    const previousPage = currentPageIndex >= 1
        ? <PaginatorButton title={(currentPageIndex).toString()} onClick={() => goToPage(currentPageIndex - 1)}/>
        : null;

    const currentPage = <PaginatorButton title={(currentPageIndex + 1).toString()} isCurrentPage/>

    const nextPage = currentPageIndex < pageCount - 1
        ? <PaginatorButton title={(currentPageIndex + 2).toString()} onClick={() => goToPage(currentPageIndex + 1)}/>
        : null;

    const lastPage = currentPageIndex !== (pageCount - 1)
        ? <PaginatorButton title="&raquo;" onClick={() => goToPage(pageCount - 1)}/>
        : null;

    return (
        <ul className="pagination">
            {firstPage}
            {previousPage}
            {currentPage}
            {nextPage}
            {lastPage}
        </ul>
    )
}

Paginator.propTypes = {
    goToPage: PropTypes.func.isRequired,
    pageCount: PropTypes.number.isRequired,         // total page
    pageSize: PropTypes.number.isRequired,
    currentPageIndex: PropTypes.number.isRequired,       // index of current page
}


export default Paginator;