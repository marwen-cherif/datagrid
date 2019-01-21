import React from 'react'
import ReactDOM from 'react-dom'
import DataGridBody from './Body'
import { mount } from 'enzyme'

const DataGridConfiguration = {
  columns: [
    { label: 'ID', name: 'id', rowIdentifier: true },
    { label: 'Column2', name: 'column2' },
    { label: 'Column3', name: 'column3', style: { minWidth: '80px' } },
    { label: 'Column4', name: 'column4', style: { minWidth: '80px' } },
    { label: 'Column5', name: 'column5', style: { minWidth: '80px' } }
  ],
  rows: [
    {
      'id': '0307f70d-8ed2-4ba9-843b-0219eb9a6431',
      'column1': 'Velit laborum velit commodo nulla ex cupidatat consequat proident irure.',
      'column2': 'Esse labore exercitation veniam incididunt ex amet velit consectetur minim dolor.',
      'column3': 66,
      'column4': 14865,
      'column5': 44140
    },
    {
      'id': '9d68559c-24b0-4068-a7db-c9c6b624b633',
      'column1': 'Nulla adipisicing nostrud amet aliquip deserunt do non commodo magna.',
      'column2': 'Sit dolor excepteur aliqua quis velit elit id aute laboris.',
      'column3': 167,
      'column4': 6985,
      'column5': 19133
    },
    {
      'id': '87619691-b392-470e-81b7-acb35afad1ae',
      'column1': 'Cupidatat minim ut excepteur magna ipsum Lorem amet magna commodo ut occaecat veniam.',
      'column2': 'Voluptate ipsum eu et sunt reprehenderit labore excepteur minim laborum.',
      'column3': 194,
      'column4': 20270,
      'column5': 49279
    },
    {
      'id': '2ef8ab41-284a-4677-bb11-e6ce6ff22044',
      'column1': 'Amet reprehenderit duis consequat anim proident dolore incididunt mollit ut.',
      'column2': 'Aute incididunt quis ea eu sit ad mollit amet aliqua quis velit dolore.',
      'column3': 282,
      'column4': 36314,
      'column5': 26648
    },
    {
      'id': '41501456-456d-409d-b5b4-8c43b92d5249',
      'column1': 'Nisi anim quis veniam duis et amet amet.',
      'column2': 'Consequat cillum commodo id enim.',
      'column3': 298,
      'column4': 17706,
      'column5': 46206
    },
    {
      'id': '982c3936-e107-4a20-9149-bc684b066a1c',
      'column1': 'Sit do et quis enim exercitation ut cillum sint occaecat nostrud esse aliqua id.',
      'column2': 'Esse aliquip nostrud voluptate officia aliqua esse.',
      'column3': 402,
      'column4': 36097,
      'column5': 32674
    },
    {
      'id': '14d37183-0c3f-4447-9ce0-2af622ff3564',
      'column1': 'Laborum id quis ut ex amet.',
      'column2': 'Nisi nulla duis laboris et esse tempor amet cillum incididunt anim quis tempor.',
      'column3': 523,
      'column4': 41030,
      'column5': 14950
    },
    {
      'id': 'c115ab13-93b7-4e10-8a58-09042f8e3c22',
      'column1': 'Aliquip velit enim Lorem non excepteur eu.',
      'column2': 'Cupidatat nostrud esse pariatur nulla anim sint anim deserunt labore do anim nulla exercitation aute.',
      'column3': 575,
      'column4': 47993,
      'column5': 46316
    },
    {
      'id': 'bf1220a8-2a09-4794-9d83-53d4d8436e4c',
      'column1': 'Dolor velit nisi sint enim.',
      'column2': 'Eu sint minim culpa voluptate consequat exercitation.',
      'column3': 611,
      'column4': 44404,
      'column5': 14705
    },
    {
      'id': '1473f57b-5af8-4a1c-b19b-4b6a357a138f',
      'column1': 'Lorem exercitation tempor mollit ad labore incididunt tempor.',
      'column2': 'Anim officia mollit esse nisi exercitation veniam proident mollit culpa consequat veniam aliqua dolore amet.',
      'column3': 693,
      'column4': 35561,
      'column5': 19908
    }
  ],
  url: '/api/data'
}

it('Test body datagrid', () => {
  let { columns, rows } = DataGridConfiguration
  const table = document.createElement('table')
  const wrapper = mount(<DataGridBody
    rows={rows}
    columns={columns}
  />, { attachTo: table })

  expect(wrapper.find('td'))
    .to.have.lengthOf(50)

})
