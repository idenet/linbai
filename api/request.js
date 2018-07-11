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

function getBookDetail(id) {
  return axios(`${config.baseUrl}/book/${id}/detail`, 'GET')
}

// 获取短评
function getBookComments(id) {
  return axios(`${config.baseUrl}/book/${id}/short_comment`, 'GET')
}

// 书籍点赞
function getBookLikes(id) {
  return axios(`${config.baseUrl}/book/${id}/favor`, 'GET')
}

module.exports = {
  getPeriodical,
  details,
  getNext,
  getPrev,
  getHotBook,
  getHotWord,
  getBookSearch,
  getBookDetail,
  getBookComments,
  getBookLikes
}
