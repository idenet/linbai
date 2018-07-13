const request = require('../../api/request')
const periodical = require('../../config/periodical')
const util = require('../../utils/util')

Page({
	data: {
		id: 0,
		likeStatus: 0, // 喜欢的状态
		year: 0,
		month: '', // 月
		indexShow: '',
		type: 0, // 类型 100 电影 200 音乐 300 句子
		content: [], // 内容
		title: '', // 标题
		favNums: 0, // 点赞数
		image: '',
		url: '', // mp3
		playState: false, // 播放状态
		time: 0 // 音频播放位置
	},
	onLoad(options) {
		const { id, type } = options
		this._getDetail(type, id)
	},
	clickLike() {
		post.postLike({ art_id: this.data.id, type: this.data.type }).then(res => this._getDetail())
	},
	clickDislike() {
		post.postDislike({ art_id: this.data.id, type: this.data.type }).then(res => this._getDetail())
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
	_initPlay() {
		if (this.innerAudioContext) {
			this.innerAudioContext.destroy()
			this.setData({
				playState: false,
				time: 0
			})
		}
	},
	_getDetail(type, id) {
		request.details(type, id).then(res => this.setData({ ...periodical.factory(res.data) }))
	},
	onHide() {
		this._initPlay()
	},

	onUnload() {
		this._initPlay()
	}
})
