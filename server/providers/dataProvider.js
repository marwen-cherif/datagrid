import AbstractServiceProvider from './AbstractServiceProvider'
import constants from '../constants'
import dataMock from '../data'

class DataProvider extends AbstractServiceProvider {

  constructor() {
    super()
    this.onGetData = this.onGetData.bind(this)
    this.on(constants.GET_DATA_ACTION, this.onGetData)
  }

  onGetData({ offset, limit, columns }) {
    let data = dataMock()
    data.filter((item, index) => (index >= offset && index <= offset + limit))
      .sort((a, b) => {

      })
  }

}

export default DataProvider
