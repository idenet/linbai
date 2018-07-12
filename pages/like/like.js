Page({
	data: {
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		userinfo: {}
	},
	bindGetUserInfo: function(e) {
		wx.setStorageSync('user', e.detail.userInfo)
		this.setData({
			userinfo: e.detail.userInfo
		})
	},
	onLoad(options) {
		this._getuserInfo()
	},
	_getuserInfo() {
		const userinfo = wx.getStorageSync('user')
		console.log(userinfo)
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
	onReady() {},

	onShow() {},

	onHide() {},

	onUnload() {},

	onPullDownRefresh() {},

	onReachBottom() {},

	onShareAppMessage() {}
})
