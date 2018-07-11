const axios = require('./axios')
const config = require('./config')

function postLike(data) {
  return axios(`${config.baseUrl}/like?appkey=${config.appkey}`, 'POST', data)
}

function postDislike(data) {
  return axios(`${config.baseUrl}/like/cancel?appkey=${config.appkey}`, 'POST', data)
}

function postAddComments(data) {
  return axios(`${config.baseUrl}/book/add/short_comment`, 'POST', data)
}

module.exports = {
  postLike,
  postDislike,
  postAddComments
}
