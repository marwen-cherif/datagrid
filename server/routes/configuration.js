const actions = {
  GET_DATA: 'GET_DATA',
  PATCH_DATA: 'PATCH_DATA',
  DELETE_DATA: 'DELETE_DATA',
}
module.exports.actions = actions

const routeDefinitions = [
  {
    name: 'get_data',
    route: '/data',
    method: 'POST',
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
