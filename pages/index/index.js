//index.js
//获取应用实例
const app = getApp()
const request = require('../../api/request')
const post = require('../../api/post')
const periodical = require('../../config/periodical')

Page({
	data: {
		id: 0,
		likeStatus: 0,
		year: 0,
		month: 0,
		index: 0, // 第几期刊
		indexShow: '',
		type: 0, // 类型
		content: [], // 内容
		title: '', // 标题
		favNums: 0, // 点赞数
		image: '',
		url: '', // mp3
		playState: false, // 播放状态
		time: 0 // 音频播放位置
	},

	onLoad() {
		this._getPeriodical()
	},
	clickMusicrunning() {
		this.innerAudioContext = wx.createInnerAudioContext()
		// 增加一个资源loading，以免多次点击后，播放多个音乐
		wx.showLoading({
			title: '正在加载资源...',
			mask: true
		})
		this.innerAudioContext.src = this.data.url
		this.innerAudioContext.loop = true
		this.innerAudioContext.startTime = this.data.time
		this.innerAudioContext.play()
		this.innerAudioContext.onPlay(() => {
			console.log('正在播放')
			this.setData({
				playState: true
			})
			wx.hideLoading()
		})
	},
	clickMusicPause() {
		if (this.innerAudioContext.paused === true) {
			return
		}
		this.innerAudioContext.pause()
		this.innerAudioContext.onPause(() => {
			console.log('暂停播放')
			this.setData({
				playState: false,
				time: this.innerAudioContext.currentTime
			})
		})
	},
	clickLike() {
		post.postLike({ art_id: this.data.id, type: this.data.type }).then(res => {
			if (res.statusCode === 201) {
				this._getDeatils()
			}
		})
	},
	clickDislike() {
		post.postDislike({ art_id: this.data.id, type: this.data.type }).then(res => {
			if (res.statusCode === 201) {
				this._getDeatils()
			}
		})
	},
	clickPrev() {
		this._initPlay() // 切换的时候关闭
		request.getPrev(this.data.index).then(res => {
			if (res.statusCode === 200) {
				this.setData({
					...periodical.factory(res.data)
				})
			} else if (res.data.error_code === 3000) {
				wx.showToast({
					title: '没有上一期内容',
					icon: 'none',
					duration: 1500,
					mask: false
				})
			}
		})
	},
	clickNext() {
		this._initPlay()
		request.getNext(this.data.index).then(res => {
			if (res.statusCode === 200) {
				this.setData({
					...periodical.factory(res.data)
				})
			} else if (res.data.error_code === 3000) {
				wx.showToast({
					title: '没有下一期内容',
					icon: 'none',
					duration: 1500,
					mask: false
				})
			}
		})
	},
	_initPlay() {
		if (this.innerAudioContext) {
			this.innerAudioContext.destroy()
			this.setData({
				playState: false,
				time: 0
			})
		}
	},
	_getDeatils() {
		console.log(this.data.id, this.data.type)
		request.details(this.data.type, this.data.id).then(res => {
			if (res.statusCode === 200) {
				this.setData({
					...periodical.factory(res.data)
				})
			}
		})
	},
	_getPeriodical() {
		request.getPeriodical().then(res => {
			if (res.statusCode === 200) {
				this.setData({
					...periodical.factory(res.data)
				})
			}
		})
	},
	onReady() {},

	onShow() {},

	onHide() {
		this._initPlay()
	},

	onUnload() {
		// 当卸载页面的时候停止
		this._initPlay()
	},

	onPullDownRefresh() {},

	onReachBottom() {},

	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮， 必须是按钮fuck
			console.log(res.target)
		}
		return {
			title: '转发',
			path: '/page/user?id=123'
		}
	}
})
