class Like {
	constructor({ type, favNums, id, likeStatus, content, image }) {
		this.type = type
		this.favNums = favNums
		this.id = id
		this.likeStatus = likeStatus
		this.content = content
		this.image = image
	}
}

function factoryLike(data) {
	return new Like({
		type: data.type === 100 ? '电影' : data.type === 200 ? '音乐' : '句子',
		favNums: data.fav_nums,
		id: data.id,
		likeStatus: data.like_status,
		content: data.content,
		image: data.image
	})
}

module.exports = factoryLike
