const v4 = require('uuid')

module.exports = function (nbrOfItems = 100000) {
  let data = []
  for (let i = 0; i < nbrOfItems; i++) {
    data = [...data, {
      id: v4(),
      column1: v4(),
      column2: v4(),
      column3: v4()
    }]
  }
  return data
}
