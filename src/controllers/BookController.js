const Book = require('../models/Book')

module.exports = {
  async create (req, res) {
    try {
      const { ISBN } = req.body
      const bookExists = await Book.findOne({ ISBN })
      if (bookExists) {
        return res.json('Book exists')
      } else {
        const book = await Book.create(req.body)
        return res.json(book)
      }
    } catch (err) {
      throw new Error(err.message)
    }
  },

  async update (req, res) {
    try {
      const book = await Book.findById(req.params.id)
      if (book.is_rent === true) {
        return res.json('Book is already rented')
      } else {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(book)
      }
    } catch (err) {
      throw new Error(err.message)
    }
  },

  async remove (req, res) {
    try {
      const book = await Book.findById(req.params.id)
      if (book.is_rent === true) {
        return res.json('Book is already rented')
      } else {
        await Book.findByIdAndRemove(req.params.id)
        return res.send()
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
