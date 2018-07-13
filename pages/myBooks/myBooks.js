const util = require('../../utils/util')

Page({
	data: {
		likeBooks: []
	},

	onLoad(options) {
		this._getLikeBooks()
	},
	_getLikeBooks() {
		this.setData({
			likeBooks: util.getStorage('likeBooks')
		})
	},
	onReady() {},

	onShow() {},

	onHide() {},

	onUnload() {}
})
