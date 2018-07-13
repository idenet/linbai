const request = require('../../api/request')
const util = require('../../utils/util')

Component({
	properties: {
		query: {
			type: String,
			value: '',
			observer(newVal, oldVal) {
				if (!newVal) {
					// 为空则hide
					this.triggerEvent('hideEvent', {})
				} else {
					this._getHotBookList(newVal)
				}
			}
		}
	},
	data: {
		bookList: [],
		start: 0, // 记录数 即分页的第一页 第二页等等
		count: 20 // 每次显示条数 默认20条
	},
	methods: {
		scrolltolower() {
			if (this._checkMore() === false) {
				util.showToast('没有更多了', 'info')
			} else {
				request
					.getBookSearch({
						start: this.data.start,
						count: this.data.count,
						summary: 1,
						q: this.properties.query
					})
					.then(res => {
						this.setData({
							bookList: this.data.bookList.concat(res.data.books),
							start: this.data.start + 1
						})
					})
			}
		},
		clickBookDetail(e) {
			let bookId = e.currentTarget.dataset.id
			this._setStorage(e)
			wx.navigateTo({
				url: `../../pages/bookDetail/bookDetail?bookId=${bookId}`
			})
		},
		_setStorage(e) {
			let bookTitle = e.currentTarget.dataset.title
			util.setHistoryStorage(bookTitle, 'history')
		},
		_getHotBookList(query) {
			request
				.getBookSearch({
					start: this.data.start,
					count: this.data.count,
					summary: 1,
					q: query
				})
				.then(res => {
					this.setData({
						bookList: res.data.books,
						start: this.data.start + 1
					})
				})
		},
		_checkMore() {
			return this.data.bookList.length > 400 ? false : true
		}
	}
})
