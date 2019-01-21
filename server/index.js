const routes = require('./routeResolver')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000
const validator = require('express-validator')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(validator())

app.use('/api', routes)

app.listen(port, () => console.log(`Listening on port ${port}`))
