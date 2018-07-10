const app = getApp()
const historySearch = ['从你的全世界路过', '雷雨', '听风', '三毛', '听雨', 'go学习', 'js学习', '斧王']
const request = require('../../api/request')

Page({
	data: {
		books: [],
		showWitch: 1, // 1表示展示book 2表示切换到search // 3表示键盘输入
		hotWord: [], // 搜索热词
		historyKey: historySearch,
		value: ''
	},
	onFocus(e) {
		// 跳转到搜索页
		wx.navigateTo({
			url: '../search/search'
		})
		this.setData({
			showWitch: 2
		})
	},
	onBlur(e) {
		const value = e.detail.e.detail.value
		// 有值的时候不切换
		if (value) {
			return
		}
		this.setData({
			showWitch: 1
		})
	},
	cancel() {
		this.setData({
			showWitch: 1,
			value: ''
		})
	},
	clickHot(e) {
		console.log(e)
	},
	input(e) {
		this.setData({
			showWitch: 3
		})
		const value = e.detail.e.detail.value
		console.log(value, this.data.showWitch)
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
