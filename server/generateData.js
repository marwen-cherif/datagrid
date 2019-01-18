const v4 = require('uuid')
const loremIpsum = require('lorem-ipsum')
const fs = require('fs')
const config = require('config')

function generate(nbrOfItems = 100000) {
  let data = []
  for (let i = 0; i < nbrOfItems; i++) {
    data = [...data, {
      id: v4(),
      column1: loremIpsum({ count: 5 }),
      column2: loremIpsum({ count: 10 }),
      column3: loremIpsum({ count: 15 })
    }]
  }
  if (fs.existsSync('data.json')) {
    fs.unlinkSync('data.json')
  }
  fs.writeFileSync('data.json', JSON.stringify(data))
}

generate(config.get('numberOfGeneratedRows'))
