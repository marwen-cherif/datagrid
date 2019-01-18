const AbstractServiceProvider = require('./AbstractServiceProvider')
const { actions } = require('../routes/configuration')
const { HeapSort } = require('../helper/sortHelper/heapSort')
const { body } = require('express-validator/check')

class Data extends AbstractServiceProvider {

  constructor() {
    super()
    this.getData = this.getData.bind(this)
    this.on(actions.GET_DATA, this.getData)
  }

  static validate(method) {
    switch (method) {
      case 'get_data': {
        return [
          body('offset', 'offset need to be numeric').isNumeric(),
          body('offset', 'offset is required').exists(),
          body('pageLength', 'pageLength should be numeric').isNumeric(),
          body('pageLength', 'pageLength is required').exists(),
          body('columns').isArray().optional()
        ]
      }
    }
  }

  getData({ offset, pageLength, columns = [] }) {

    let data = require('../../data.json')
    let sorter = new HeapSort()
    data = sorter.sort(data, columns)

    data = data.filter((item, index) => (index + 1 >= offset && index + 1 <= offset + pageLength))

    this.emit(actions.GET_DATA + '_DONE', null, data)
  }
}

module.exports = Data
