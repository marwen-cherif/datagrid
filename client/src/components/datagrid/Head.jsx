import React from 'react'
import v4 from 'uuid'
import SortIcon from './SortIcon'

const DataGridHead = ({ sort = [], columns = [], onSort = f => f }) => <thead>
<tr key={v4()}>
  {
    columns.map((column) =>
      <th key={v4()} onClick={() => onSort(column)}>
        <div style={{ resize: 'horizontal' }}>
          {column.name} <SortIcon sort={sort} column={column} />
        </div>
      </th>)
  }
</tr>
</thead>

export default DataGridHead
