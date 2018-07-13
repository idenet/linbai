// const historySearch = ['从你的全世界路过', '雷雨', '听风', '三毛', '听雨', 'go学习', 'js学习', '斧王']
const request = require('../../api/request')
const util = require('../../utils/util')

Page({
	data: {
		hotWord: [], // 搜索热词
		historyKey: [],
		showSwitch: 1,
		query: '', // 查询的q
		inputValue: ''
	},
	clickHotWord(e) {
		this._inputWord(e)
	},
	clickHistoryWord(e) {
		this._inputWord(e)
	},
	clickCancel() {
		// 为2 点取消
		this.data.showSwitch === 2 &&
			this.setData({
				showSwitch: 1,
				inputValue: ''
			})
	},
	onFocus() {
		// 切换
		this.setData({
			showSwitch: 2
		})
	},
	hide() {
		this.setData({
			showSwitch: 1
		})
	},
	// 搜索防抖
	onInput: util.debounce(function(e) {
		this.setData({
			query: e.detail.value
		})
	}, 200),
	onShow(options) {
		this._getHotWord()
		this._getHistoryKey()
	},
	onReachBottom() {
		console.log('上啦刷新')
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
	_getHistoryKey() {
		this.setData({
			historyKey: util.getStorage('history')
		})
	},
	_inputWord(e) {
		const value = e.target.dataset.item
		// 将value放到input框， 将value传到query， 将showSwitch修改为2
		this.setData({
			inputValue: value,
			query: value,
			showSwitch: 2
		})
	}
})
