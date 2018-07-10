const util = require('../../utils/util')
Component({
	properties: {
		// 这里定义了innerText属性，属性值可以在组件使用时指定
		innerText: {
			type: String,
			value: '搜索图书名称'
		},
		showWitch: {
			type: Number,
			value: 1
		},
		inputValue: {
			type: String,
			value: ''
		}
	},
	ready() {},
	methods: {
		cancel() {
			this.triggerEvent('onCancel', {})
		},
		focus(e) {
			this.triggerEvent('focus', { e })
		},
		blur(e) {
			this.triggerEvent('blur', { e })
		},
		// debounce 必须这么使用
		input: util.debounce(function(e) {
			this.triggerEvent('onInput', { e })
		}, 200)
	}
})
