const request = require('../../api/request')
const post = require('../../api/post')

const util = require('../../utils/util')

Page({
	data: {
		book: {},
		comments: [],
		summary: [],
		likeNums: 0,
		likeStatus: 0, // 是否喜欢
		inputStatus: 1, // 输入框状态 1为未聚焦 2为聚焦
		value: '', // 输入框 value值
		placeholder: '留下你的短评～',
		placeholderFocus: '短评功能被关闭',
		comment: '' // 短评
	},
	onFocus() {
		// 跳转到搜索页
		wx.navigateTo({
			url: '../search/search'
		})
	},
	onBlur(e) {
		this.setData({
			comment: e.detail.value
		})
	},
	onFocusComments() {
		this.setData({
			inputStatus: 2
		})
	},
	onLoad(options) {
		util.loading('加载中...')
		this._getBookDetail(options.bookId)
		this._getBookComments(options.bookId)
		this._getBookLikes(options.bookId)
		wx.hideLoading()
	},
	clickCancel() {
		this.setData({
			inputStatus: 1,
			value: ''
		})
	},
	clickSubmit() {
		// post
		// 	.postAddComments({ book_id: this.data.book.id, content: this.data.comment })
		// 	.then(res => console.log(res.data))
		this.setData({
			inputStatus: 1,
			value: ''
		})
	},
	clickLikeOrDisLike() {
		if (this.data.likeStatus === 0) {
			this._clickLike()
		} else {
			this._clickDisLike()
		}
	},
	clickLike() {
		const cancel = this.data.likeStatus === 0 ? '' : '/cancel'
		post.like({ art_id: this.data.book.id, type: 400 }, cancel).then(res => {
			if (res.data.error_code === 0) {
				this._getBookLikes(this.data.book.id)
				util.setBooksStorage(this.data.book, 'likeBooks') // 存储喜欢的book
			}
		})
	},
	_getBookDetail(id) {
		request.getBookDetail(id).then(res => {
			const summary = res.data.summary.split(/\\n/g)
			if (res.statusCode === 200) {
				this.setData({
					book: res.data,
					summary
				})
			}
		})
	},
	_getBookComments(id) {
		request.getBookComments(id).then(res => {
			if (res.statusCode === 200) {
				this.setData({
					comments: res.data.comments
				})
			}
		})
	},
	_getBookLikes(id) {
		request.getBookLikes(id).then(res => {
			if (res.statusCode === 200) {
				this.setData({
					likeNums: res.data.fav_nums,
					likeStatus: res.data.like_status
				})
			}
		})
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮， 必须是按钮
			console.log(res.target)
		}
		return {
			title: '转发',
			path: '/bookDetail'
		}
	}
})
