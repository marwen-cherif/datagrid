const constants = require('../../constants')

class QuickSort {

  constructor() {
    this.sort = this.sort.bind(this)
    this.quickSort = this.quickSort.bind(this)
    this.partition = this.partition.bind(this)
  }

  static swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

  sort(arr, columns) {
    console.log(`Start sorting ${arr.length} element`)
    let now = new Date()
    let duration = null
    if (!columns.length || columns === undefined) {
      duration = new Date() - now
      console.log(`Sorting finished in ${duration} ms`)
      return arr
    }
    this.toBeOrderedColumns = buildToBeOrderedColumns(columns)
    let result = this.quickSort(arr)
    duration = new Date() - now
    console.log(`Sorting finished in ${duration} ms`)
    return result
  }

  quickSort(arr, left = 0, right = arr.length - 1) {
    let len = arr.length,
      pivot,
      partitionIndex

    if (left < right) {
      pivot = right
      partitionIndex = this.partition(arr, pivot, left, right)

      //sort left and right
      this.quickSort(arr, left, partitionIndex - 1)
      this.quickSort(arr, partitionIndex + 1, right)
    }
    return arr
  }

  partition(arr, pivot, left, right) {
    let pivotValue = arr[pivot],
      partitionIndex = left

    for (let i = left; i < right; i++) {
      let test = this.toBeOrderedColumns.reduce((acc, val) => {
          return decide(val(arr[i], pivotValue), acc)
        }
        , 0)
      if (test < 0) {
        QuickSort.swap(arr, i, partitionIndex)
        partitionIndex++
      }
    }
    QuickSort.swap(arr, right, partitionIndex)
    return partitionIndex
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

const buildToBeOrderedColumns = (columns) => {
  return columns.reduce((acc, column) => {
    if (column.order === constants.DESCENDING_ORDER) {
      acc = [...acc, (a, b) => -1 * sortValue(a[column.name], b[column.name])]
    } else if (column.order === constants.ASCENDING_ORDER) {
      acc = [...acc, (a, b) => sortValue(a[column.name], b[column.name])]
    }
    return acc
  }, [])
    .reverse()
}

module.exports.QuickSort = QuickSort
