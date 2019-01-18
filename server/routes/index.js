const express = require('express')
const { routeDefinitions } = require('./configuration')
const { curry } = require('ramda')
const constants = require('../constants')

const router = express.Router()

const validatorHandler = next => result => {
  if (result.isEmpty()) return
  if (!next)
    throw new Error(
      result.array().map(i => `${i.msg}`).join(' , ')
    )
  else
    return next(
      new Error(
        result.array().map(i => `${i.msg}`).join(' , ')
      )
    )
}

const providerInject = (routeDefinition, getParams, req, res) => {
  req.getValidationResult()
    .then(validatorHandler())
    .then(() => {
      const provider = new routeDefinition.provider()
      provider.on(routeDefinition.action + '_DONE', function (err, result) {
        if (err)
          res.json({ status: 500, message: err })
        res.json({ status: 200, data: result })
      })
      provider.emit(routeDefinition.action, getParams(req))
    })
    .catch((err) => {
      res.json({ status: 500, message: err.message })
    })
}

for (const routeDefinition of routeDefinitions) {
  switch (routeDefinition.method) {
    case constants.GET:
      router.route(routeDefinition.route)
        .get(
          routeDefinition.provider ? routeDefinition.provider.validate(routeDefinition.name) : (f) => (f),
          curry(providerInject)(routeDefinition, (req) => req.query),
        )
      break
    case constants.POST:
      router.route(routeDefinition.route)
        .post(
          routeDefinition.provider ? routeDefinition.provider.validate(routeDefinition.name) : (f) => (f),
          curry(providerInject)(routeDefinition, (req) => req.body),
        )
      break
    case constants.DELETE:
      router.route(routeDefinition.route)
        .delete(
          routeDefinition.provider ? routeDefinition.provider.validate(routeDefinition.name) : (f) => (f),
          curry(providerInject)(routeDefinition, (req) => req.query)
        )
      break
    case constants.PATCH:
      router.route(routeDefinition.route)
        .patch(
          routeDefinition.provider ? routeDefinition.provider.validate(routeDefinition.name) : (f) => (f),
          curry(providerInject)(routeDefinition, (req) => req.body)
        )
      break
    default:
      throw new Error(`The configured route method is not supported : ${routeDefinition.method}`)
  }
}

module.exports = router
