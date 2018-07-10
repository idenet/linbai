const historySearch = ['从你的全世界路过', '雷雨', '听风', '三毛', '听雨', 'go学习', 'js学习', '斧王']
const request = require('../../api/request')
const util = require('../../utils/util')

Page({
  data: {
    hotWord: [], // 搜索热词
    historyKey: historySearch,
    showSwitch: 1,
    value: ''
  },
  clickHotWord(e) {
    console.log(e)
  },
  clickCancel() {
    // 跳转回去
    wx.navigateBack({
      delta: 1
    })
  },
  onFocus() {
    this.setData({
      showSwitch: 2
    })
  },
  onInput: util.debounce(function (e) {
    this.setData({
      value: e.detail.value
    })
  }, 200),
  onLoad(options) {
    this._getHotWord()
    this._getHotBookList(this.data.value)
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
  _getHotBookList(value) {
    request
      .getBookSearch({
        summary: 1,
        q: value
      })
      .then(res => {
        console.log(res.data)
      })
  },
  onReady() { },

  onShow() { },

  onHide() { },

  onUnload() { },

  onPullDownRefresh() { },

  onReachBottom() { },

  onShareAppMessage() { }
})
