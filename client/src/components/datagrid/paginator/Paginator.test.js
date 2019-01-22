import React from 'react'
import ReactDOM from 'react-dom'
import Paginator from './Paginator'
import { mount } from 'enzyme'

it('Test Page selector component', () => {
  let offset = 0
  let pageLength = 100
  let totalRecords = 1000
  const wrapper = mount(<Paginator
    goTo={f => f}
    offset={offset}
    pageLength={pageLength}
    totalRecords={totalRecords}
    onPageLengthChange={f => f}
  />)
  expect(wrapper.find('.paginator')).to.have.lengthOf(1)
  expect(wrapper.find('.pageSelector')).to.have.lengthOf(1)
  expect(wrapper.find('.pageLengthSelector')).to.have.lengthOf(1)
})
