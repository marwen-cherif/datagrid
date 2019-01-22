import React from 'react'
import v4 from 'uuid'
import PropTypes from 'prop-types'
import { curry } from 'ramda'

const DataGridBody = ({ rows = [], columns = [], onRowSelected }) => {
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
        <td>
          <input
            type="checkbox"
            checked={row.selected}
            onChange={curry(onRowSelected)(row)}
          />
        </td>
      </tr>
    )
  }
  </tbody>
}

DataGridBody.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onRowSelected: PropTypes.func.isRequired
}

DataGridBody.defaultProps = {
  sort: [],
  columns: []
}

export default DataGridBody
