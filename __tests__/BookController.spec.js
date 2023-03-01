const BookController = require('../src/controllers/BookController')
const Book = require('../src/models/Book')

jest.mock('../src/models/Book')

describe('BookController', () => {
  describe('create', () => {
    it('should create a new book when it does not exist', async () => {
      const req = {
        body: {
          ISBN: 'ABC123',
          title: 'Test Book',
          author: 'Test Author'
        }
      }

      const res = {
        json: jest.fn()
      }

      Book.findOne.mockReturnValue(null)
      Book.create.mockResolvedValue(req.body)

      await BookController.create(req, res)

      expect(Book.findOne).toHaveBeenCalledWith({ ISBN: req.body.ISBN })
      expect(Book.create).toHaveBeenCalledWith(req.body)
      expect(res.json).toHaveBeenCalledWith(req.body)
    })

    it('should return "Book exists" when the book already exists', async () => {
      const req = {
        body: {
          ISBN: 'ABC123',
          title: 'Test Book',
          author: 'Test Author'
        }
      }

      const res = {
        json: jest.fn()
      }

      Book.findOne.mockReturnValue(req.body)

      await BookController.create(req, res)

      expect(Book.findOne).toHaveBeenCalledWith({ ISBN: req.body.ISBN })
      expect(res.json).toHaveBeenCalledWith('Book exists')
    })
  })

  describe('update', () => {
    it('should update a book when it is not rented', async () => {
      const bookId = '123'
      const book = {
        title: 'Old title'
      }
      const updatedBook = {
        title: 'New title'
      }
      Book.findById.mockResolvedValue(book)
      Book.findByIdAndUpdate.mockResolvedValue(updatedBook)

      const req = {
        params: {
          id: bookId
        },
        body: {
        }
      }
      const res = {
        json: jest.fn()
      }

      await BookController.update(req, res)

      expect(Book.findByIdAndUpdate).toHaveBeenCalledWith(
        bookId,
        req.body,
        { new: true }
      )

      expect(res.json).toHaveBeenCalledWith(updatedBook)
    })

    it('should return "Book is already rented" when the book is rented', async () => {
      const req = {
        params: {
          id: '123'
        },
        body: {
          title: 'New Title'
        }
      }

      const res = {
        json: jest.fn()
      }

      const book = {
        _id: '123',
        title: 'Old Title',
        is_rent: true
      }

      Book.findById.mockResolvedValue(book)

      await BookController.update(req, res)

      expect(Book.findById).toHaveBeenCalledWith(req.params.id)
      expect(res.json).toHaveBeenCalledWith('Book is already rented')
    })
  })

  describe('remove', () => {
    it('should remove a book when it is not rented', async () => {
      const req = {
        params: {
          id: '123'
        }
      }

      const res = {
        send: jest.fn()
      }

      const book = {
        _id: '123',
        is_rent: false
      }

      Book.findById.mockResolvedValue(book)
      Book.findByIdAndRemove.mockResolvedValue()

      await BookController.remove(req, res)

      expect(Book.findById).toHaveBeenCalledWith(req.params.id)
      expect(Book.findByIdAndRemove).toHaveBeenCalledWith(req.params.id)
      expect(res.send).toHaveBeenCalled()
    })

    it('should return "Book is already rented" when the book is rented', async () => {
      const req = {
        params: {
          id: '123'
        }
      }

      const res = {
        json: jest.fn()
      }

      const book = {
        _id: '123',
        is_rent: true
      }

      Book.findById.mockResolvedValue(book)

      await BookController.remove(req, res)

      expect(Book.findById).toHaveBeenCalledWith(req.params.id)
      expect(res.json).toHaveBeenCalledWith('Book is already rented')
    })
  })
})
