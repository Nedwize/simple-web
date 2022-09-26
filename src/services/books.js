const { Book } = require('../models')

class BookService {
  static async AddBook(data) {
    const book = new Book(data)
    await book.save()
    return book
  }

  static async GetBook(bookId) {
    const book = await Book.findById(bookId)
      .select('title description author isbn pictureUrl -_id')
      .lean()
    if (!book) {
      console.log(`No book found with id ${bookId}`)
      return null
    }
    return book
  }

  static GetAllBooks() {
    return Book.find({})
      .select('title description author isbn pictureUrl -_id')
      .lean()
  }

  static async DeleteBook(bookId) {
    await Book.deleteOne({ _id: bookId })
  }
}

module.exports = BookService
