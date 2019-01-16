class SortHelper {
  constructor(algorithm) {
    const cls = require('./' + algorithm)
    this.algorithm = new cls()
  }

  sort(arr, columns) {
    return this.algorithm.sort(arr, columns)
  }

}

module.exports.SortHelper = SortHelper
