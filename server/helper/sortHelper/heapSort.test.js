const assert = require('assert')
const { HeapSort } = require('./heapSort')

let data = [
  { column1: 'aa', column2: 'ac' },
  { column1: 'ac', column2: 'aa' },
  { column1: 'ab', column2: 'aa' },
  { column1: 'aa', column2: 'ab' }
]

describe('Heap sorting', function () {
  let heapSort = new HeapSort()
  describe('Sort just one column', function () {
    let result = heapSort.sort(data, [
      { order: 'ASC', name: 'column1' }
    ])
    it('should return a well sorted array', function () {
      assert.deepStrictEqual(result, [
        { column1: 'aa', column2: 'ac' },
        { column1: 'aa', column2: 'ab' },
        { column1: 'ab', column2: 'aa' },
        { column1: 'ac', column2: 'aa' },
      ])
    })
  })

  describe('Sort on multiple columns', function () {
    let result = heapSort.sort(data, [
      { order: 'ASC', name: 'column1' },
      { order: 'ASC', name: 'column2' }
    ])
    it('should return a well sorted array', function () {
      assert.deepStrictEqual(result, [
        { column1: 'aa', column2: 'ab' },
        { column1: 'aa', column2: 'ac' },
        { column1: 'ab', column2: 'aa' },
        { column1: 'ac', column2: 'aa' },
      ])
    })
  })
})
