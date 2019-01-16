const EventEmitter = require('events')

class AbstractServiceProvider extends EventEmitter {
  constructor() {
    super()
  }
}

module.exports = AbstractServiceProvider
