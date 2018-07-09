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

module.exports = {
	loading,
	debounce
}
