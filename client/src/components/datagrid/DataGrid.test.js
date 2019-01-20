import React from 'react'
import ReactDOM from 'react-dom'
import DataGrid from './index'
import { mount } from 'enzyme'

const DataGridConfiguration = {
  columns: [
    { label: 'ID', name: 'id', rowIdentifier: true },
    { label: 'Column2', name: 'column2' },
    { label: 'Column3', name: 'column3', style: { 'min-width': '80px' } },
    { label: 'Column4', name: 'column4', style: { 'min-width': '80px' } },
    { label: 'Column5', name: 'column5', style: { 'min-width': '80px' } }
  ],
  url: '/api/data'
}

it('Should have de table', () => {
  const wrapper = mount(<DataGrid config={DataGridConfiguration} />)
  expect(wrapper.find('.dataGridTable')).to.have.lengthOf(1)
  expect(wrapper.find('th')).to.have.lengthOf(5)

  // let tree = component.toJSON()
  // expect(tree).toMatchSnapshot()
  //
  // // manually trigger the callback
  // tree.props.onMouseEnter()
  // // re-rendering
  // tree = component.toJSON()
  // expect(tree).toMatchSnapshot()
  //
  // // manually trigger the callback
  // tree.props.onMouseLeave()
  // // re-rendering
  // tree = component.toJSON()
  // expect(tree).toMatchSnapshot()
})
