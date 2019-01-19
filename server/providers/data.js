const AbstractServiceProvider = require('./AbstractServiceProvider')
const { actions } = require('../routeResolver/configuration')
const { QuickSort } = require('../helper/sortHelper/quickSort')
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
    let sorter = new QuickSort()
    let result = sorter.sort([...data], columns)
      .slice(offset, pageLength + 1)

    this.emit(actions.GET_DATA + '_DONE', null, result)
  }
}

module.exports = Data
