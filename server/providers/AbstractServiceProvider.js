const EventEmitter = require('events')

class AbstractServiceProvider extends EventEmitter {
  constructor() {
    super()
  }

  static validate(method) {
    throw new Error('Validate function is not implemented for this route.')
  }
}

module.exports = AbstractServiceProvider
