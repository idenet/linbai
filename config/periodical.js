const Month = ['0', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

class Periodical {
	constructor({ id, likeStatus, year, month, index, indexShow, type, content, title, favNums, image, url }) {
		this.id = id
		this.likeStatus = likeStatus
		this.year = year
		this.month = month
		this.index = index //返回的index 期刊号
		this.indexShow = indexShow // 需要显示的index
		this.type = type
		this.content = content
		this.title = title
		this.favNums = favNums
		this.image = image
		this.url = url
	}
}

function factory(data) {
	console.log(data.content.split(' '))
	let date = new Date(data.pubdate)
	return new Periodical({
		id: data.id,
		image: data.image,
		favNums: data.fav_nums,
		likeStatus: data.like_status,
		year: date.getFullYear(),
		month: Month[date.getMonth() + 1],
		index: data.index,
		indexShow: (data.index + '').padStart(2, '0'),
		type: data.type,
		content: data.content.split(' '),
		title: data.title,
		url: data.url ? data.url : ''
	})
}

module.exports = {
	factory
}
