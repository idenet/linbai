Component({
	properties: {
		indexShow: {
			type: String,
			value: ''
		},
		month: {
			type: String,
			value: ''
		},
		year: {
			type: Number,
			value: 0
		},
		likeStatus: {
			type: Number,
			value: 0
		},
		favNums: {
			type: Number,
			value: 0
		},
		sourceType: {
			type: Number,
			value: 0
		}
	},
	methods: {
		clickLikeOrDis() {
			this.triggerEvent('clickLike', {})
		}
	}
})
