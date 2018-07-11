const app = getApp()
const request = require('../../api/request')

Page({
  data: {
    books: []
  },
  onFocus(e) {
    // 跳转到搜索页
    wx.navigateTo({
      url: '../search/search'
    })
  },
  tapBookDetails(e) {
    let bookId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../bookDetail/bookDetail?bookId=${bookId}`
    })
  },
  onLoad: function (options) {
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
  onReady: function () {
    // 渲染完成
    wx.hideLoading()
  },

  onShow: function () { },

  onHide: function () { },

  onUnload: function () { },

  onPullDownRefresh: function () { },

  onReachBottom: function () { },

  onShareAppMessage: function () { }
})
