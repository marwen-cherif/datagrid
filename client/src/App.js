import React, { Component } from 'react'
import './App.css'
import DataGrid from './components/datagrid'

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Datagrid
        </header>
        <div className="container">
          <DataGrid
            config={DataGridConfiguration}
          />
        </div>
      </div>
    )
  }
}

export default App
