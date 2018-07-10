const historySearch = ['从你的全世界路过', '雷雨', '听风', '三毛', '听雨', 'go学习', 'js学习', '斧王']
const request = require('../../api/request')

Page({
	data: {
		hotWord: [], // 搜索热词
		historyKey: historySearch
	},
	clickHotWord(e) {
		console.log(e)
	},
	onLoad(options) {
		this._getHotWord()
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
	_getHotBookList() {
		request
			.getBookSearch({
				summary: 1,
				q: value
			})
			.then(res => {
				console.log(res.data)
			})
	},
	onReady() {},

	onShow() {},

	onHide() {},

	onUnload() {},

	onPullDownRefresh() {},

	onReachBottom() {},

	onShareAppMessage() {}
})
