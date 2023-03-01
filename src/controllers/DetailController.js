const Book = require('../models/Book')

module.exports = {
  async detail (req, res) {
    try {
      const book = await Book.findById(req.params.id)
      return res.json(book)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
