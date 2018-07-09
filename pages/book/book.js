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
		this.setData({
			showWitch: 2
		})
	},
	onBlur(e) {
    const value = e.detail.e.detail.value
    if(value) {
      return
    }
		this.setData({
			showWitch: 1
		})
  },
  cancel() {

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
		this._getHotWord() // 该放哪里加载？
	},
	_getHotBook() {
		request
			.getBookSearch({
				summary: 1,
				q: value
			})
			.then(res => {
				console.log(res.data)
			})
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
	_getHotWord() {
		request.getHotWord().then(res => {
			if (res.statusCode === 200) {
				this.setData({
					hotWord: res.data.hot
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
