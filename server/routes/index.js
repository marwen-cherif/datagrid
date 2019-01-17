const express = require('express')
const validate = require('express-validation')
// import taskCtrl from '../controllers/tasks'
// import validations from '../providers/validation/tasks'
const { routeDefinitions } = require('./configuration')
const { curry } = require('ramda')
const constants = require('../constants')

const router = express.Router()

const providerInject = (routeDefinition, req, res) => {
  const provider = new routeDefinition.provider()
  provider.on(routeDefinition.action + '_DONE', function (err, result) {
    if (err)
      res.json({ status: 500, message: err })
    res.json({ status: 200, data: result })
  })
  provider.emit(routeDefinition.action, req.query)
}

for (const routeDefinition of routeDefinitions) {
  switch (routeDefinition.method) {
    case constants.GET:
      router.route(routeDefinition.route)
        .get(curry(providerInject)(routeDefinition))
      break
    case constants.DELETE:
      router.route(routeDefinition.route)
        .delete(curry(providerInject)(routeDefinition))
      break
    case constants.PATCH:
      router.route(routeDefinition.route)
        .patch(curry(providerInject)(routeDefinition))
      break
    default:
      throw new Error(`The configured route method is not supported : ${routeDefinition.method}`)
  }
}

module.exports = router
