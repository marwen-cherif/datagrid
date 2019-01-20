import React from 'react'
import v4 from 'uuid'
import PropTypes from 'prop-types'

const DataGridBody = ({ rows = [], columns = [] }) => {
  return <tbody>
  {
    rows.map((row) =>
      <tr key={v4()}>
        {
          columns.map((column) =>
            <td
              key={v4()}
              style={column.style}
            >
              {row[column.name]}
            </td>
          )
        }
      </tr>
    )
  }
  </tbody>
}

DataGridBody.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
}

DataGridBody.defaultProps = {
  sort: [],
  columns: []
}

export default DataGridBody
