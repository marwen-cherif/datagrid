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
        pages.push(<span key={v4()} className={className}>{i}</span>)
        break
      default:
        debugger
        let nextOffset = (parseInt(i) - 1) * pageLength
        pages.push(<span key={v4()} className={className}
                         onClick={() => goTo(nextOffset)}>{i}</span>)
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
  return [
    <span key={v4()}
          className='paginatorPage'
          onClick={() => goTo(0)}> {'<<'} </span>,
    <span key={v4()}
          className='paginatorPage'
          onClick={() => goTo(offset - pageLength)}> {'<'} </span>,
    ...pages,
    <span key={v4()}
          className='paginatorPage'
          onClick={() => goTo(offset + pageLength)}> {'>'} </span>,
    <span key={v4()}
          className='paginatorPage'
          onClick={() => goTo(maxPages * pageLength - pageLength)}> {'>>'} </span>
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
  totalRecords: 0,
  goTo: f => f,
}

export default PageSelector
