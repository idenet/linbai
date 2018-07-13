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
		bookList: []
	},
	methods: {
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
					summary: 1,
					q: query
				})
				.then(res => {
					this.setData({
						bookList: res.data.books
					})
				})
		}
	}
})
