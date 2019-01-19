import React from 'react'

const SortIcon = ({ sort = [], column }) => {
  debugger
  let sortedColumn = sort.filter((elem) => elem._id === column._id)
  if (sortedColumn && sortedColumn.length) {
    switch (sortedColumn[0].order) {
      case 'ASC':
        return <i className="fas fa-sort-up" />
      case 'DESC':
        return <i className="fas fa-sort-down" />
      default:
        return <i className="fas fa-sort" />
    }
  } else {
    return <i className="fas fa-sort" />
  }
}

export default SortIcon
