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
      totalRecords: 0,
      columnIdentifier: columns.reduce((acc, elem) => {
        if (elem.identifier) {
          acc = elem.name
        }
        return acc
      }, null)
    }
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

    Api.call({ ...this.state, sort }, (err, res) => {
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

  onColumnsChange(columns) {
    this.setState({ ...this.state, columns })
  }

  onRowSelected(row, event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    let { rows, columnIdentifier } = this.state
    let newState = {
      ...this.state,
      rows: rows.map((elem) => {
        if (elem[columnIdentifier] === row[columnIdentifier]) {
          elem = { ...row, selected: value === true }
        }
        return elem
      })
    }
    this.setState(newState)
  }

  onRowsRemove() {
    debugger
    let { rows } = this.state
    this.setState({
      ...this.state,
      rows: rows.filter((elem) => elem.selected !== true)
    })
  }

  render() {
    let { rows, columns, sort, loading, offset, pageLength, totalRecords, columnIdentifier } = this.state
    return <div className="table-container">
      <Loader loading={loading} />
      <table className="dataGridTable">
        <DataGridHead
          sort={sort}
          columns={columns}
          onSort={this.sortColumn.bind(this)}
          onColumnsChange={this.onColumnsChange.bind(this)}
          onRowsRemove={this.onRowsRemove.bind(this)}
        />
        <DataGridBody
          rows={rows}
          columns={columns}
          onRowSelected={(row, event) => this.onRowSelected.bind(this)(row, event)}
          columnIdentifier={columnIdentifier}
        />
      </table>
      <Paginator
        offset={offset}
        pageLength={pageLength}
        totalRecords={totalRecords}
        goTo={this.goTo.bind(this)}
        onPageLengthChange={this.onPageLengthChange.bind(this)}
      />
    </div>
  }
}
