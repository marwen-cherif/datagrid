import heapSort from './heapSort'

const Algorithms = {
  heapSort
}

class SortHelper {
  constructor(algorithm) {
    this.algorithm = new Algorithms[algorithm]()
  }

  sort(arr, columns) {
    return this.algorithm.sort(arr, columns)
  }

}

export default SortHelper
