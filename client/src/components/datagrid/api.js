import axios from 'axios'

export default class Api {
  static call({ url, offset, pageLength, sort }, callback = f => f) {
    axios.post(url, {
      offset,
      pageLength,
      sort
    })
      .then(function ({ data }) {
        callback(null, data)
      })
      .catch(function (error) {
        console.error(error)
        callback(error)
      })
  }
}
