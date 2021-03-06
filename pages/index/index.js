//index.js
//获取应用实例
const app = getApp()
const request = require('../../api/request')
const post = require('../../api/post')
const periodical = require('../../config/periodical')
const util = require('../../utils/util')

Page({
	data: {
		id: 0,
		likeStatus: 0, // 喜欢的状态
		year: 0,
		month: '', // 月
		index: 0, // 第几期刊
		indexShow: '',
		type: 0, // 类型 100 电影 200 音乐 300 句子
		content: [], // 内容
		title: '', // 标题
		favNums: 0, // 点赞数
		image: '',
		url: '', // mp3
		playState: false, // 播放状态
		time: 0, // 音频播放位置
		latest: 0 // 最新一期
	},

	onLoad() {
		this._getPeriodical()
	},
	clickPrev() {
		if (this.data.index === 1) return // 到底了
		this._initPlay() // 切换的时候关闭
		request.getPrev(this.data.index).then(res => {
			if (res.statusCode === 200) {
				this.setData({
					...periodical.factory(res.data)
				})
			}
		})
	},
	clickNext() {
		if (this.data.index === this.data.latest) return // 到顶了
		this._initPlay()
		request.getNext(this.data.index).then(res => {
			if (res.statusCode === 200) {
				this.setData({
					...periodical.factory(res.data)
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
					...periodical.factory(res.data),
					latest: res.data.index
				})
			}
		})
	},
	clickLike() {
		const cancel = this.data.likeStatus === 0 ? '' : '/cancel'
		post.like({ art_id: this.data.id, type: this.data.type }, cancel).then(res => {
			this._getDeatils()
		})
	},
	clickMusicrunning() {
		this.innerAudioContext = wx.createInnerAudioContext()
		util.loading('加载音乐资源...')
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
			// 来自页面内转发按钮， 必须是按钮
			console.log(res.target)
		}
		return {
			title: '转发',
			path: '/index'
		}
	}
})
