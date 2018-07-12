const request = require('../../api/request')

Component({
  properties: {
    query: {
      type: String,
      value: '',
      observer(newVal, oldVal) {
        if (!newVal) {
          this.triggerEvent('hideEvent', {})
        } else {
          this._getHotBookList(newVal)
        }
      }
    }
  },
  data: {
    bookList: [],
    history: [] // 历史记录
  },
  attached() {
    this._getStorage()
  },
  methods: {
    clickBookDetail(e) {
      let bookId = e.currentTarget.dataset.id
      this._setStorage(e)
      this.triggerEvent('getStorage', {})
      wx.navigateTo({
        url: `../../pages/bookDetail/bookDetail?bookId=${bookId}`
      })
    },
    _setStorage(e) {
      let bookTitle = e.currentTarget.dataset.title
      const historyList = [...this.data.history, bookTitle] // 不能用push？
      wx.setStorageSync('history', JSON.stringify(historyList))
    },
    _getStorage() {
      var that = this
      wx.getStorage({
        key: 'history',
        success(res) {
          console.log(res)
          that.setData({
            history: JSON.parse(res.data)
          })
        },
        fail(e) {
          that.setData({
            history: []
          })
        }
      })
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
    },
  }
})