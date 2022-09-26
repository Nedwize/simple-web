const { BookService } = require('../services')

const bookRouter = require('express').Router()

bookRouter
  .route('/')
  .get(async (_req, res) => {
    const books = await BookService.GetAllBooks()
    res.status(200).json(books)
  })
  .post(async (req, res) => {
    await BookService.AddBook(req.body)
    res.status(201).json({ message: 'ok' })
  })

bookRouter
  .route('/:id')
  .get(async (req, res) => {
    const book = await BookService.GetBook(req.params.id)
    return res.status(200).json(book)
  })
  .delete(async (req, res) => {
    await BookService.DeleteBook(req.params.id)
    return res.status(200).json({ message: 'ok' })
  })

module.exports = bookRouter
