const request = require('../../api/request')

const factoryLike = require('../../config/like')
const util = require('../../utils/util')

Page({
	data: {
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		userinfo: {},
		likesList: [],
		likeBooks: 0
	},
	bindGetUserInfo: function(e) {
		wx.setStorageSync('user', e.detail.userInfo)
		this.setData({
			userinfo: e.detail.userInfo
		})
	},
	tapAboutMe() {
		wx.navigateTo({
			url: '/pages/aboutMe/aboutMe'
		})
	},
	tapMyBooks() {
		if (this.data.likeBooks === 0) return
		wx.navigateTo({
			url: '/pages/myBooks/myBooks'
		})
	},
	onLoad(options) {},
	onShow() {
		util.loading('加载中...')
		this._getuserInfo()
		this._getLikePeriodical()
		this._getLikeBooks()
		wx.hideLoading()
	},
	_getuserInfo() {
		const userinfo = wx.getStorageSync('user')
		if (userinfo) {
			this.setData({
				userinfo
			})
		} else {
			this.setData({
				userinfo: {}
			})
		}
	},
	_getLikePeriodical() {
		request.getLikePeriodical().then(res =>
			this.setData({
				likesList: res.data.map(item => factoryLike(item))
			})
		)
	},
	_getLikeBooks() {
		request.getLikeBooks().then(res => this.setData({ likeBooks: res.data.count }))
	}
})
