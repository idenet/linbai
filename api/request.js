const axios = require('./axios')
const config = require('./config')

function getPeriodical() {
	return axios(`${config.baseUrl}/classic/latest`, 'GET')
}

function details(type, id) {
	return axios(`${config.baseUrl}/classic/${type}/${id}`, 'GET')
}

function getPrev(index) {
	return axios(`${config.baseUrl}/classic/${index}/previous`, 'GET')
}

function getNext(index) {
	return axios(`${config.baseUrl}/classic/${index}/next`, 'GET')
}

// book
function getHotBook() {
	return axios(`${config.baseUrl}/book/hot_list`, 'GET')
}

function getHotWord() {
	return axios(`${config.baseUrl}/book/hot_keyword`, 'GET')
}

function getBookSearch(data) {
	return axios(`${config.baseUrl}/book/search`, 'GET', data)
}

module.exports = {
	getPeriodical,
	details,
	getNext,
	getPrev,
	getHotBook,
	getHotWord,
	getBookSearch
}
