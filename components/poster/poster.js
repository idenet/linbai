Component({
	properties: {
		image: {
			type: String,
			value: ''
		},
		playState: {
			type: Boolean,
			value: false
		},
		type: {
			type: Number,
			value: 0
		},
		content: {
			type: Array,
			value: []
		}
	},
	methods: {
		clickMusic() {
			if (this.properties.playState === false) {
				this.triggerEvent('clickMusicrunning', {})
			} else {
				this.triggerEvent('clickMusicPause', {})
			}
		}
	}
})
