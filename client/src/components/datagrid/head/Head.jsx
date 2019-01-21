import React from 'react'
import v4 from 'uuid'
import SortIcon from './SortIcon'
import PropTypes from 'prop-types'

const DataGridHead = ({ sort = [], columns = [], onSort = f => f }) => <thead>
<tr key={v4()}>
  {
    columns.map((column) =>
      <th key={v4()} title={column.name}>
        <div style={{ resize: 'horizontal' }}>
          {column.name} <SortIcon onSort={() => onSort(column)} sort={sort} column={column} />
        </div>
      </th>)
  }
</tr>
</thead>

DataGridHead.propTypes = {
  sort: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
}

DataGridHead.defaultProps = {
  sort: [],
  columns: []
}

export default DataGridHead
