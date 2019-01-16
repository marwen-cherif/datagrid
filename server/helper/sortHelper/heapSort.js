const constants = require('../../constants')

const decide = (test, other) => test === 0 ? other : test
const sortString = (a, b) => {
  return ((a < b) ? -1 : ((a > b) ? 1 : 0))
}

let array_length

const buildToBeOrderedColumns = (columns) => {
  return columns.reduce((acc, elem) => {
    if (elem.order === constants.DESCENDING_ORDER) {
      acc = [...acc, (a, b) => sortString(a, b)]
    } else if (elem.order === constants.ASCENDING_ORDER) {
      acc = [...acc, (a, b) => -1 * sortString(a, b)]
    }
    return acc
  }, [])
}

class HeapSort {

  constructor() {
    this.sort = this.sort.bind(this)
    this.heapSort = this.heapSort.bind(this)
    this.heap_root = this.heap_root.bind(this)
  }

  static swap(input, index_A, index_B) {
    let swapFrom = Math.min(index_A, index_B)
    let swapTo = Math.max(index_A, index_B)
    return [
      ...input.slice(0, swapFrom),
      input[swapTo],
      ...input.slice(swapFrom + 1, swapTo),
      input[swapFrom],
      ...input.slice(swapTo + 1)
    ]
  }

  sort(arr, columns) {
    if (columns === undefined)
      return arr
    this.toBeOrderedColumns = buildToBeOrderedColumns(columns)
    return this.heapSort(arr)
  }

  heapSort(input) {
    let localArray = [...input]
    array_length = localArray.length

    for (let i = Math.floor(array_length / 2); i >= 0; i -= 1) {
      localArray = this.heap_root(localArray, i)
    }

    for (let i = localArray.length - 1; i > 0; i--) {
      localArray = this.swap(localArray, 0, i)
      array_length--

      localArray = this.heap_root(localArray, 0)
    }
    return localArray
  }

  heap_root(input, i) {
    let localArray = [...input]
    let left = 2 * i + 1
    let right = 2 * i + 2
    let max = i

    if (left < array_length && this.toBeOrderedColumns.reduce((acc, val) => decide(val(left, max), acc), 0)) {
      max = left
    }

    if (right < array_length && this.toBeOrderedColumns.reduce((acc, val) => decide(val(right, max), acc), 0)) {
      max = right
    }

    if (max !== i) {
      localArray = this.swap(localArray, i, max)
      localArray = this.heap_root(localArray, max)
    }

    return localArray
  }
}

module.exports.HeapSort = HeapSort
