import constants from '../../constants'

const decide = (test, other) => test === 0 ? other : test
const sortString = (a, b) => {
  return ((a < b) ? -1 : ((a > b) ? 1 : 0))
}

let array_length
const heap_root = (input, i) => {
  let left = 2 * i + 1
  let right = 2 * i + 2
  let max = i

  if (left < array_length && input[left] > input[max]) {
    max = left
  }

  if (right < array_length && input[right] > input[max]) {
    max = right
  }

  if (max !== i) {
    swap(input, i, max)
    heap_root(input, max)
  }
}

const swap = (input, index_A, index_B) => {
  let temp = input[index_A]

  input[index_A] = input[index_B]
  input[index_B] = temp
}

const heapSort = (input) => {

  array_length = input.length

  for (let i = Math.floor(array_length / 2); i >= 0; i -= 1) {
    heap_root(input, i)
  }

  for (i = input.length - 1; i > 0; i--) {
    swap(input, 0, i)
    array_length--

    heap_root(input, 0)
  }
}

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

  sort(arr, columns) {
    let toBeOrderedColumns = buildToBeOrderedColumns(columns)

    // Test
    return toBeOrderedColumns.reduce((acc, val) => decide(val(a, b), acc), 0)
  }
}

export default HeapSort
