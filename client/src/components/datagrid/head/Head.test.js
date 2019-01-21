import React from 'react'
import ReactDOM from 'react-dom'
import DataGridHead from './Head'
import { mount } from 'enzyme'

const DataGridConfiguration = {
  columns: [
    { label: 'ID', name: 'id', rowIdentifier: true },
    { label: 'Column2', name: 'column2', style: { minWidth: '80px' } },
    { label: 'Column3', name: 'column3', style: { minWidth: '80px' } },
    { label: 'Column4', name: 'column4', style: { minWidth: '80px' } },
    { label: 'Column5', name: 'column5', style: { minWidth: '80px' } }
  ],
  url: '/api/data'
}

it('Test head datagrid', () => {
  let { columns } = DataGridConfiguration
  let clickedColumn = null
  const table = document.createElement('table')
  const wrapper = mount(<DataGridHead
    sort={[]}
    columns={columns}
    onSort={(column) => clickedColumn = column}
  />, { attachTo: table })
  wrapper.find('i.fas.fa-sort')
    .at(0)
    .simulate('click')
  expect(clickedColumn.label)
    .to.equal(columns[0].label)

})
