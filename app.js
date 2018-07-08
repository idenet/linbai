//app.js
App({
	onLaunch: function() {
		// 获取用户信息
		this._getUserInfo()
	},
	_getUserInfo: function() {
		var userInfoStorage = wx.getStorageSync('user')
		if (!userInfoStorage) {
			var that = this
			wx.login({
				success: function() {
					wx.getUserInfo({
						success: function(res) {
							console.log(res)
							that.globalData.userInfo = res.userInfo
							wx.setStorageSync('user', res.userInfo)
						},
						fail: function(res) {
							console.log(res)
						}
					})
				}
			})
		} else {
			this.globalData.userInfo = userInfoStorage
		}
	},
	globalData: {
		userInfo: null
	}
})
