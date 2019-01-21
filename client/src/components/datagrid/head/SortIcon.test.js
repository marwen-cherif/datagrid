import React from 'react'
import ReactDOM from 'react-dom'
import SortIcon from './SortIcon'
import { shallow } from 'enzyme'
import v4 from 'uuid'

it('Test asc sort', () => {
  let id = v4()
  let column = { _id: id, label: 'ID', name: 'id', rowIdentifier: true }
  let sort = [
    { _id: id, label: 'ID', name: 'id', order: 'ASC' }
  ]
  let clickedColumn = null
  const wrapper = shallow(<SortIcon
    sort={sort}
    column={column}
    onSort={(c) => clickedColumn = c}
  />)
  expect(wrapper.find('i.fas.fa-sort-up')).to.have.lengthOf(1)

  wrapper.find('i.fas.fa-sort-up')
    .at(0)
    .simulate('click')
  expect(clickedColumn._id)
    .to.equal(column._id)
})

it('Test desc sort', () => {
  let id = v4()
  let column = { _id: id, label: 'ID', name: 'id', rowIdentifier: true }
  let sort = [
    { _id: id, label: 'ID', name: 'id', order: 'DESC' }
  ]
  let clickedColumn = null
  const wrapper = shallow(<SortIcon
    sort={sort}
    column={column}
    onSort={(c) => clickedColumn = c}
  />)
  expect(wrapper.find('i.fas.fa-sort-down')).to.have.lengthOf(1)

  wrapper.find('i.fas.fa-sort-down')
    .at(0)
    .simulate('click')
  expect(clickedColumn._id)
    .to.equal(column._id)
})

it('Test not sorted column', () => {
  let id = v4()
  let column = { _id: id, label: 'ID', name: 'id', rowIdentifier: true }
  let sort = [
    { _id: id, label: 'ID', name: 'id' }
  ]
  let clickedColumn = null
  const wrapper = shallow(<SortIcon
    sort={sort}
    column={column}
    onSort={(c) => clickedColumn = c}
  />)
  expect(wrapper.find('i.fas.fa-sort')).to.have.lengthOf(1)

  wrapper.find('i.fas.fa-sort')
    .at(0)
    .simulate('click')
  expect(clickedColumn._id)
    .to.equal(column._id)
})
