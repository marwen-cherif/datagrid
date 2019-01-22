import React from 'react'
import v4 from 'uuid'
import SortIcon from './SortIcon'
import PropTypes from 'prop-types'
import { curry } from 'ramda'

const placeholderChild = document.createElement('div')
const placeholder = document.createElement('th')
placeholderChild.innerText = 'Drop Here'
placeholder.appendChild(placeholderChild)
placeholder.className = 'placeholder'

let over = null
let dragged = null
let cloneHeight = null

const DataGridHead = ({ columns, onSort, sort, onColumnsChange, onRowsRemove }) => <thead>
<tr key={v4()}
    className="rowHeader"
    onDragOver={dragOver}>
  {
    columns.map((column) =>
      <th key={v4()}
          data-id={column._id}
          draggable="true"
          onDragStart={dragStart}
          onDragEnd={curry(dragEnd)({ onColumnsChange, columns })}
          title={column.name}>
        <div>
          {column.name}
          <SortIcon
            onSort={() => onSort(column)}
            sort={sort}
            column={column}
          />
        </div>
      </th>)
  }
  <th>
    <div>
      <i
        className="fas fa-trash delete-action"
        title="Delete selected rows"
        onClick={onRowsRemove}
      />
    </div>
  </th>
</tr>
</thead>

function dragEnd({ onColumnsChange, columns }, event) {

  dragged.style.display = 'block'
  try {
    dragged.parentNode.removeChild(placeholder)
  } catch (e) {
    console.error(e)
  }

  const data = [...columns]
  let startFrom = null
  data.forEach((elem, index) => {
    if (elem._id === dragged.dataset.id)
      startFrom = index
  })
  startFrom = startFrom !== null ? startFrom : data.length - 1

  let to = null
  data.forEach((elem, index) => {
    if (elem._id === over.parentNode.dataset.id) {
      to = index
    } else if (over.nodeName === 'I' && elem._id === over.parentNode.parentNode.dataset.id) {
      to = index
    }
  })
  to = to !== null ? to : data.length - 1
  if (startFrom === to) to--
  console.log(`From: ${startFrom}, To: ${to}`)
  data.splice(to, 0, data.splice(startFrom, 1)[0])

  over = null
  dragged = null
  cloneHeight = null
  placeholder.removeAttribute('data-id')
  onColumnsChange(data)
}

function dragStart(event) {
  dragged = event.currentTarget
  cloneHeight = dragged.getBoundingClientRect().height
  placeholder.style.height = cloneHeight + 'px'
  placeholder.setAttribute('data-id', dragged.dataset.id)
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/html', dragged)
}

function dragOver(event) {
  event.preventDefault()
  dragged.style.display = 'none'
  if (event.target.className === 'placeholder') return
  over = event.target
  if (event.target.parentNode.nodeName === 'TH') {
    event.target.parentNode.parentNode.insertBefore(placeholder, event.target.parentNode)
  }
}

DataGridHead.propTypes = {
  sort: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  onColumnsChange: PropTypes.func.isRequired
}

DataGridHead.defaultProps = {
  sort: [],
  columns: []
}

export default DataGridHead
