const axios = require('./axios')
const config = require('./config')

function postLike(data) {
	return axios(`${config.baseUrl}/like?appkey=${config.appkey}`, 'POST', data)
}

function postDislike(data) {
	return axios(`${config.baseUrl}/like/cancel?appkey=${config.appkey}`, 'POST', data)
}

module.exports = {
	postLike,
	postDislike
}
