import React from 'react'
import v4 from 'uuid'

const DataGridBody = ({ rows = [], columns = [] }) => {
  return <tbody>
  {
    rows.map((row) =>
      <tr key={v4()}>
        {
          columns.map((column) =>
            <td key={v4()}>
              {row[column.name]}
            </td>
          )
        }
      </tr>
    )
  }
  </tbody>
}

export default DataGridBody
