import constants from 'constants'

const routes = [
  {
    'name': 'get_data',
    'route': '/data',
    'method': 'GET',
    'action': constants.GET_DATA_ACTION
  },
  {
    'name': 'delete_data',
    'route': '/data/{dataId}',
    'method': 'DELETE',
    'action': constants.DELETE_DATA_ACTION
  }
]

export default routes
