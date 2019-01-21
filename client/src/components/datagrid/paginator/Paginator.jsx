import React from 'react'
import PropTypes from 'prop-types'
import PageLengthSelector from './pageLengthSelector'
import PageSelector from './pageSelector'

const Paginator = ({ offset, pageLength, totalRecords, goTo, onPageLengthChange }) => {
  return <div
    className="paginator">
    <PageSelector
      goTo={goTo}
      offset={offset}
      pageLength={pageLength}
      totalRecords={totalRecords}
    />
    <PageLengthSelector
      pageLength={pageLength}
      onPageLengthChange={onPageLengthChange}
    />
  </div>
}

Paginator.propTypes = {
  offset: PropTypes.number.isRequired,
  pageLength: PropTypes.number.isRequired,
  totalRecords: PropTypes.number,
  goTo: PropTypes.func.isRequired,
  onPageLengthChange: PropTypes.func.isRequired
}

Paginator.defaultProps = {
  offset: 0,
  pageLength: 100,
  totalRecords: 0
}

export default Paginator
