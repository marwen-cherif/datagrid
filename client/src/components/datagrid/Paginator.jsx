import React from 'react'
import v4 from 'uuid'

const Paginator = ({ sort = [], onSort }) => <thead>
<tr key={v4()}>
  {
    sort.map((column) =>
      <th key={v4()} onClick={onSort(column)}>
        <div style={{ resize: 'horizontal' }}>
          {column.name}
        </div>
      </th>)
  }
</tr>
</thead>

export default Paginator
