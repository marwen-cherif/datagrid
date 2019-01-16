const actions = {
  GET_DATA: 'GET_DATA',
  PATCH_DATA: 'PATCH_DATA',
  DELETE_DATA: 'DELETE_DATA',
  GENERATE_DATA: 'GENERATE_DATA'
}
module.exports.actions = actions

const routeDefinitions = [
  {
    name: 'generate_data',
    route: '/data/generate',
    method: 'GET',
    action: actions.GENERATE_DATA,
    provider: require('../providers/data')
  },
  {
    name: 'get_data',
    route: '/data',
    method: 'GET',
    action: actions.GET_DATA,
    provider: require('../providers/data')
  },
  {
    name: 'delete_data',
    route: '/data/:dataId',
    method: 'DELETE',
    action: actions.DELETE_DATA
  },
  {
    name: 'patch_data',
    route: '/data/:dataId',
    method: 'PATCH',
    action: actions.DELETE_DATA
  }
]
module.exports.routeDefinitions = routeDefinitions
