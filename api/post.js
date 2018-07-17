const axios = require('./axios')
const config = require('./config')

function like(data, cancel) {
	return axios(`${config.baseUrl}/like${cancel}?appkey=${config.appkey}`, 'POST', data)
}

function postAddComments(data) {
	return axios(`${config.baseUrl}/book/add/short_comment`, 'POST', data)
}

module.exports = {
	like,
	postAddComments
}
