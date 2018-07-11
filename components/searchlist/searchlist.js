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
    bookList: []
  },
  methods: {
    clickBookDetail(e) {
      let bookId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `../../pages/bookDetail/bookDetail?bookId=${bookId}`
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