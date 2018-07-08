class Book {
	constructor({ favNums, bookId, likeStatus, author, bookTitle, bookImage }) {
		this.favNums = favNums
		this.bookId = bookId
		this.likeStatus = likeStatus
		this.author = author
		this.bookTitle = bookTitle
		this.bookImage = bookImage
	}
}

function factory(data) {
	return new Book({
		favNums: data.fav_nums,
		bookId: data.id,
		likeStatus: data.like_status,
		author: data.author
	})
}
