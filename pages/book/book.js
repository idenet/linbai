const app = getApp()

const request = require('../../api/request')

Page({
	data: {
		books: [],
		showWitch: 1 // 1表示展示book 2表示切换到search
	},
	onFocus(e) {
		this.setData({
			showWitch: 2
		})
	},
	onBlur(e) {
		this.setData({
			showWitch: 1
		})
	},
	tapBookDetails(e) {
		let bookId = e.currentTarget.dataset.id
		wx.navigateTo({
			url: `../bookDetail/bookDetail?bookId=${bookId}`
		})
	},
	onLoad: function(options) {
		wx.showLoading({
			title: '加载中...',
			mask: true
		})
		this._getHotBook()
	},
	_getHotBook() {
		request.getHotBook().then(res => {
			if (res.statusCode === 200) {
				this.setData({
					books: res.data
				})
			}
		})
	},
	onReady: function() {
		// 渲染完成
		wx.hideLoading()
	},

	onShow: function() {},

	onHide: function() {},

	onUnload: function() {},

	onPullDownRefresh: function() {},

	onReachBottom: function() {},

	onShareAppMessage: function() {}
})
