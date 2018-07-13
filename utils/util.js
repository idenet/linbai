const MAX_LENGTH = 10

function loading(text) {
	// 增加一个资源loading，以免多次点击后，播放多个音乐
	wx.showLoading({
		title: text,
		mask: true
	})
}
/**
 *
 *防抖
 * @author 香香鸡
 * @param {*} func
 * @param {*} delay
 */
function debounce(func, delay) {
	let timer
	return function(...args) {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}

function getStorage(key) {
	let value = wx.getStorageSync(key)
	if (!value) {
		value = []
	}
	return value
}

function insertArray(arr, val, compare) {
	const index = arr.findIndex(compare)
	if (index === 0) return
	// 删除这个
	if (index > 0) {
		arr.splice(index, 1)
	}
	arr.unshift(val)
	// 弹出最后一个
	if (MAX_LENGTH && arr.length > MAX_LENGTH) {
		arr.pop()
	}
}

function deleteFormArray(arr, compare) {
	const index = arr.findIndex(compare)
	if (index > -1) {
		arr.splice(index, 1)
	}
}

function setHistoryStorage(val, key) {
	let arr = getStorage(key)
	insertArray(arr, val, item => {
		return val === item
	})
	wx.setStorageSync(key, arr)
}

function setBooksStorage(val, key) {
	let arr = getStorage(key)
	insertArray(arr, val, item => {
		return item.id === val.id
	})
	wx.setStorageSync(key, arr)
}

function deleteBooksStorage(val, key) {
	let arr = getStorage(key)
	deleteFormArray(arr, item => {
		return item.id === val.id
	})
	wx.setStorageSync(key, arr)
}

module.exports = {
	loading,
	debounce,
	getStorage,
	setHistoryStorage,
	setBooksStorage,
	deleteBooksStorage
}
