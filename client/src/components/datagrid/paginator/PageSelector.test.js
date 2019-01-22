import React from 'react'
import ReactDOM from 'react-dom'
import PageSelector from './pageSelector'
import { mount } from 'enzyme'

it('Test Page selector component', () => {
  const wrapper = mount(<PageSelector
    goTo={f => f}
    offset={0}
    pageLength={100}
    totalRecords={1000}
  />)
  expect(wrapper.find('.paginatorPage')).to.have.lengthOf(9)
})

it('Test Previous and next link', () => {
  let offset = 0
  let pageLength = 100
  let totalRecords = 1000
  let newOffset = 0
  const wrapper = mount(<PageSelector
    goTo={(o) => newOffset = o}
    offset={offset}
    pageLength={pageLength}
    totalRecords={totalRecords}
  />)
  expect(wrapper.find('.paginatorPage')).to.have.lengthOf(9)

  wrapper.find('.paginatorPage')
    .at(8)
    .simulate('click')
  expect(newOffset).to.equal(900)

  wrapper.find('.paginatorPage')
    .at(0)
    .simulate('click')
  expect(newOffset).to.equal(0)

  wrapper.find('.paginatorPage')
    .at(7)
    .simulate('click')
  expect(newOffset).to.equal(100)

  wrapper.find('.paginatorPage')
    .at(1)
    .simulate('click')
  expect(newOffset).to.equal(0)
})
