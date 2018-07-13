Page({
	data: {
		userinfo: {}
	},

	onLoad(options) {
		const userinfo = wx.getStorageSync('user')
		this.setData({
			userinfo
		})
	}
})
