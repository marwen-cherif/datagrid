import React from 'react'
import v4 from 'uuid'
import PropTypes from 'prop-types'
import constants from '../constants'

const PageLengthSelector = ({ pageLength = 100, onPageLengthChange = f => f }) => {
  return <div className="pageLengthSelector">
    <form onSubmit={(e) => e.preventDefault()}>
      <select value={pageLength} onChange={onPageLengthChange}>
        {
          constants.SUPPORTED_PAGE_LENGTH.map((pageLengthOption) => <option
              key={v4()}
              value={pageLengthOption}>
              {pageLengthOption}
            </option>
          )
        }
      </select>
    </form>
  </div>
}

PageLengthSelector.propTypes = {
  offset: PropTypes.number.isRequired,
  pageLength: PropTypes.number.isRequired,
  totalRecords: PropTypes.number,
  onPageLengthChange: PropTypes.func.isRequired
}

PageLengthSelector.defaultProps = {
  offset: 0,
  pageLength: 100,
  totalRecords: 0
}

export default PageLengthSelector
