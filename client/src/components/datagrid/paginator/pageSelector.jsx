import React from 'react'
import v4 from 'uuid'
import PropTypes from 'prop-types'
import { calculateCurrentPage, calculateMaximumPages, pagination } from '../helpers/paginatorHelper'

const PageSelector = ({ pageLength, totalRecords, offset, goTo }) => {
  let maxPages = calculateMaximumPages(pageLength, totalRecords)
  let currentPage = calculateCurrentPage(offset, pageLength)
  let pages = []
  let paginationArray = pagination(currentPage, maxPages)
  paginationArray.forEach((i) => {
    let className = 'paginatorPage '
    if (currentPage === i)
      className += 'current'

    switch (i) {
      case '...':
        pages.push(<span key={v4()}
                         className={className}>{i}</span>)
        break
      default:
        let nextOffset = (parseInt(i) - 1) * pageLength
        pages.push(
          <span
            key={v4()}
            className={className}
            onClick={() => goTo(nextOffset)}>{i}</span>
        )
    }
  })
  pages = decoratePages(pages, goTo, offset, pageLength, maxPages)

  return <div className="pageSelector">
    {
      pages.map((elem) => elem)
    }
  </div>
}

function decoratePages(pages, goTo, offset, pageLength, maxPages) {
  let lastPage = maxPages * pageLength - pageLength
  let previousPage = (offset - pageLength) < 0 ? 0 : offset - pageLength
  let nextPage = (offset + pageLength) > lastPage ? lastPage : (offset + pageLength)
  return [
    <span key={v4()}
          className='paginatorPage'
          onClick={() => goTo(0)}> {'<<'} </span>,
    <span key={v4()}
          className='paginatorPage'
          onClick={() => goTo(previousPage)}> {'<'} </span>,
    ...pages,
    <span key={v4()}
          className='paginatorPage'
          onClick={() => goTo(nextPage)}> {'>'} </span>,
    <span key={v4()}
          className='paginatorPage'
          onClick={() => goTo(lastPage)}> {'>>'} </span>
  ]
}

PageSelector.propTypes = {
  offset: PropTypes.number.isRequired,
  pageLength: PropTypes.number.isRequired,
  totalRecords: PropTypes.number,
  goTo: PropTypes.func.isRequired,
}

PageSelector.defaultProps = {
  offset: 0,
  pageLength: 100,
  totalRecords: 0
}

export default PageSelector
