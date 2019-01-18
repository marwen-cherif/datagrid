const constants = require('../../constants')

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
      localArray = HeapSort.swap(localArray, 0, i)
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

    let test = this.toBeOrderedColumns.reduce((acc, val) => {
      if (localArray[left])
        return decide(val(localArray[left], localArray[max]), acc)
      return acc
    }, 0)
    if (left < array_length && test > 0) {
      max = left
    }

    test = this.toBeOrderedColumns.reduce((acc, val) => {
      if (localArray[right])
        return decide(val(localArray[right], localArray[max]), acc)
      return acc
    }, 0)
    if (right < array_length && test > 0) {
      max = right
    }

    if (max !== i) {
      localArray = HeapSort.swap(localArray, i, max)
      localArray = this.heap_root(localArray, max)
    }

    return localArray
  }
}

const decide = (test, other) => test === 0 ? other : test
const sortValue = (a, b) => {
  let result = null
  if (isNaN(a) || isNaN(b)) {
    result = ((a.toLowerCase() < b.toLowerCase()) ? -1 : ((a.toLowerCase() > b.toLowerCase()) ? 1 : 0))
  } else {
    result = ((a < b) ? -1 : ((a > b) ? 1 : 0))
  }
  return result
}

let array_length

const buildToBeOrderedColumns = (columns) => {
  return columns.reduce((acc, column) => {
    if (column.order === constants.DESCENDING_ORDER) {
      acc = [...acc, (a, b) => -1 * sortValue(a[column.name], b[column.name])]
    } else if (column.order === constants.ASCENDING_ORDER) {
      acc = [...acc, (a, b) => sortValue(a[column.name], b[column.name])]
    }
    return acc
  }, [])
}

module.exports.HeapSort = HeapSort
