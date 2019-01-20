import axios from 'axios'

function apiCall({ url, offset, pageLength, sort }, callback = f => f) {
  axios.post(url, {
    offset,
    pageLength,
    sort
  })
    .then(function (res) {
      callback(null, res)
    })
    .catch(function (error) {
      console.error(error)
      callback(error)
    })
}

export default apiCall
