import React, { Component } from 'react'
import v4 from 'uuid'
import Loader from './loader/Loader'
import DataGridHead from './head/Head'
import DataGridBody from './body/Body'
import Paginator from './paginator'
import { calculateCurrentPage, calculateMaximumPages } from './helpers/paginatorHelper'
import Api from './api'

import './style.scss'

export default class DataGrid extends Component {

  constructor(props) {
    super(props)
    let { config } = props
    let { columns } = config
    columns = columns.map((elem) => {return { ...elem, _id: v4() }})
    this.state = {
      ...config,
      columns,
      offset: 0,
      pageLength: 100,
      sort: [],
      rows: [],
      loading: true,
      totalRecords: 0
    }
    this.sortColumn = this.sortColumn.bind(this)
    this.goTo = this.goTo.bind(this)
    this.onPageLengthChange = this.onPageLengthChange.bind(this)
  }

  componentDidMount() {
    let self = this
    Api.call(this.state, (err, res) => {
      if (err)
        return
      let { data, totalRecords } = res
      self.setState({ ...self.state, rows: data, loading: false, totalRecords })
    })
  }

  sortColumn(column) {
    let self = this
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
    this.setState({ ...this.state, loading: true })

    Api.call(this.state, (err, res) => {
      if (err)
        return
      let { data, totalRecords } = res
      self.setState({
        ...self.state, sort, rows: data, loading: false, totalRecords
      })
    })
  }

  goTo(nextOffset) {
    let self = this
    let { pageLength, totalRecords } = this.state
    if (nextOffset < 0 || calculateCurrentPage(nextOffset, pageLength) > calculateMaximumPages(pageLength, totalRecords))
      return
    this.setState({ ...this.state, loading: true })

    let newState = { ...this.state, offset: nextOffset }
    Api.call(newState, (err, res) => {
      if (err)
        return
      let { data, totalRecords } = res
      self.setState({
        ...newState, rows: data, loading: false, totalRecords
      })
    })
  }

  onPageLengthChange(event) {
    let newPageLength = event.target.value
    let self = this
    this.setState({ ...this.state, loading: true })

    let newState = { ...this.state, offset: 0, pageLength: newPageLength }
    Api.call(newState, (err, res) => {
      if (err)
        return
      let { data, totalRecords } = res
      self.setState({
        ...newState,
        rows: data,
        loading: false,
        totalRecords
      })
    })
  }

  render() {
    let { rows, columns, sort, loading, offset, pageLength, totalRecords } = this.state
    return <div className="table-container">
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
      <Paginator
        offset={offset}
        pageLength={pageLength}
        totalRecords={totalRecords}
        goTo={this.goTo}
        onPageLengthChange={this.onPageLengthChange}
      />
    </div>
  }
}