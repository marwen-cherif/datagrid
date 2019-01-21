const v4 = require('uuid')
const loremIpsum = require('lorem-ipsum')
const fs = require('fs')
const config = require('config')

function generate(nbrOfItems = 100000) {
  let data = []
  for (let i = 0; i < nbrOfItems; i++) {
    data = [...data, {
      id: v4(),
      column1: loremIpsum({ count: 1 }),
      column2: loremIpsum({ count: 1 }),
      column3: Math.floor(Math.random() * Math.floor(50000)),
      column4: Math.floor(Math.random() * Math.floor(50000)),
      column5: Math.floor(Math.random() * Math.floor(50000))
    }]
  }
  if (fs.existsSync('data.json')) {
    fs.unlinkSync('data.json')
  }
  fs.writeFileSync('data.json', JSON.stringify(data))
}

generate(config.get('numberOfGeneratedRows'))
