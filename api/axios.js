const config = require('./config')

function axios(url, method, data) {
	return new Promise((reslove, reject) => {
		wx.request({
			url,
			method,
			data: {
				appkey: config.appkey,
				...data
			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: res => {
				reslove(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
 
module.exports = axios
