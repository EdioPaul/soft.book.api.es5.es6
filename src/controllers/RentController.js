const Book = require('../models/Book')

module.exports = {
  async rentBook (req, res) {
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

  async devolution (req, res) {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
      return res.json(book)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
