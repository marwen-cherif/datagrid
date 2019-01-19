import React, { Component } from 'react'
import './App.css'
import DataGrid from './components/datagrid'

const DataGridConfiguration = {
  columns: [
    { label: 'ID', name: 'id', rowIdentifier: true },
    { label: 'Column1', name: 'column1' },
    { label: 'Column2', name: 'column2' },
    { label: 'Column3', name: 'column3' }
  ],
  url: '/api/data'
}

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  }

  callApi = async () => {
    const response = await fetch('/api/hello')
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message)
    return body
  }
  handleSubmit = async e => {
    e.preventDefault()
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    })
    const body = await response.text()
    this.setState({ responseToPost: body })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Datagrid
        </header>
        {/*<p>{this.state.response}</p>*/}
        {/*<form onSubmit={this.handleSubmit}>*/}
        {/*<p>*/}
        {/*<strong>Post to Server:</strong>*/}
        {/*</p>*/}
        {/*<input*/}
        {/*type="text"*/}
        {/*value={this.state.post}*/}
        {/*onChange={e => this.setState({ post: e.target.value })}*/}
        {/*/>*/}
        {/*<button type="submit">Submit</button>*/}
        {/*</form>*/}
        <div className="container">
          <DataGrid
            config={DataGridConfiguration}
          />
        </div>
        {/*<p>{this.state.responseToPost}</p>*/}
      </div>
    )
  }
}

export default App
