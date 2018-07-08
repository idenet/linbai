const axios = require('./axios')
const config = require('./config')

function getPeriodical() {
	return axios(`${config.baseUrl}/classic/latest?appkey=${config.appkey}`, 'GET')
}

function details(type, id) {
	return axios(`${config.baseUrl}/classic/${type}/${id}?appkey=${config.appkey}`, 'GET')
}

function getPrev(index) {
	return axios(`${config.baseUrl}/classic/${index}/previous?appkey=${config.appkey}`, 'GET')
}

function getNext(index) {
	return axios(`${config.baseUrl}/classic/${index}/next?appkey=${config.appkey}`, 'GET')
}

// book
function getHotBook() {
	return axios(`${config.baseUrl}/book/hot_list?appkey=${config.appkey}`, 'GET')
}

module.exports = {
	getPeriodical,
	details,
	getNext,
	getPrev,
	getHotBook
}
