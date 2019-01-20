import React from 'react'
import PropTypes from 'prop-types'

const SortIcon = ({ sort = [], column, onSort = f => f }) => {
  let sortedColumn = sort.filter((elem) => elem._id === column._id)
  if (sortedColumn && sortedColumn.length) {
    switch (sortedColumn[0].order) {
      case 'ASC':
        return <i className="fas fa-sort-up" onClick={() => onSort(column)} />
      case 'DESC':
        return <i className="fas fa-sort-down" onClick={() => onSort(column)} />
      default:
        return <i className="fas fa-sort" onClick={() => onSort(column)} />
    }
  } else {
    return <i className="fas fa-sort" onClick={() => onSort(column)} />
  }
}

SortIcon.propTypes = {
  sort: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
}

SortIcon.defaultProps = {
  sort: [],
  columns: [],
  onSort: f => f,
}

export default SortIcon
