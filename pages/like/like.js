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
	// 关于我
	tapAboutMe() {
		wx.navigateTo({
			url: '/pages/aboutMe/aboutMe'
		})
	},
	// 想读的书
	tapMyBooks() {
		if (this.data.likeBooks === 0) return
		wx.navigateTo({
			url: '/pages/myBooks/myBooks'
		})
	},
	tapDetail(e) {
		const id = e.currentTarget.dataset.id
		const type = e.currentTarget.dataset.type
		wx.navigateTo({
			url: `/pages/myPeriodical/myPeriodical?id=${id}&type=${type}`
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
