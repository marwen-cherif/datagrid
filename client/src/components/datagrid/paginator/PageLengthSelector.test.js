import React from 'react'
import ReactDOM from 'react-dom'
import PageLengthSelector from './pageLengthSelector'
import { mount } from 'enzyme'

it('Test page length selector', () => {
  let newValue = 0
  const wrapper = mount(<PageLengthSelector
    pageLength={100}
    onPageLengthChange={(e) => newValue = e.target.value}
  />)
  expect(wrapper.find('option')).to.have.lengthOf(8)
  wrapper.find('select')
    .at(0)
    .simulate('change', { target: { value: 500 } })
  expect(newValue).to.equal(500)
})

it('Test form is not submitted', () => {
  const wrapper = mount(<PageLengthSelector
    pageLength={100}
    onPageLengthChange={(e) => newValue = e.target.value}
  />)
  expect(wrapper.find('form')).to.have.lengthOf(1)
  wrapper.find('form')
    .at(0)
    .simulate('submit')
  expect(wrapper.find('form')).to.have.lengthOf(1)
})
