import React, { Component } from 'react'
import DataGridHead from './Head'
import DataGridBody from './Body'
import axios from 'axios'
import v4 from 'uuid'
import Loader from './Loader'

import './style.css'

export default class DataGrid extends Component {

  constructor(props) {
    super(props)
    let { config } = props
    let { columns } = config
    columns = columns.map((elem) => {
      return { ...elem, _id: v4() }
    })
    this.state = {
      ...config,
      columns,
      offset: 0,
      pageLength: 100,
      sort: [],
      rows: [],
      loading: true
    }
    this.sortColumn = this.sortColumn.bind(this)
  }

  componentDidMount() {
    let { url, offset, pageLength, sort } = this.state
    let self = this
    axios.post(url, {
      offset,
      pageLength,
      sort
    })
      .then(function (res) {
        let rows = res.data.data
        self.setState({
          ...self.state,
          rows,
          loading: false
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  sortColumn(column) {
    let { sort } = this.state
    let filteredSort = sort.filter((elem) => elem._id === column._id)
    if (filteredSort.length) {
      sort = sort.map((elem) => {
        if (elem._id === column._id) {
          return {
            ...elem,
            order: elem.order === 'DESC' ? undefined : (elem.order === undefined ? 'ASC' : 'DESC')
          }
        }
        return elem
      })
    } else {
      sort = [...sort, {
        ...column,
        order: column.order === 'DESC' ? undefined : (column.order === undefined ? 'ASC' : 'DESC')
      }]
    }
    sort = sort.filter((elem) => elem.order)

    let { url, offset, pageLength } = this.state
    let self = this
    this.setState({ ...this.state, loading: true })
    axios.post(url, {
      offset,
      pageLength,
      sort
    })
      .then(function (res) {
        let rows = res.data.data
        self.setState({
          ...self.state,
          sort,
          rows,
          loading: false
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    let { rows, columns, sort, loading } = this.state
    return <div>
      <Loader loading={loading} />
      <table className="dataGridTable">
        <DataGridHead
          sort={sort}
          columns={columns}
          onSort={(column) => this.sortColumn(column)}
        />
        <DataGridBody
          rows={rows}
          columns={columns}
        />
      </table>
    </div>
  }
}
