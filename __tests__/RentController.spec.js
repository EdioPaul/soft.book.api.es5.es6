const rentController = require('../src/controllers/RentController')
const Book = require('../src/models/Book')

jest.mock('../src/models/Book')

describe('rentBook()', () => {
  it('should return "Book is already rented" if book is already rented', async () => {
    const bookId = '123'
    const bookData = {
      is_rent: true
    }
    Book.findById.mockResolvedValue(bookData)

    const req = {
      params: {
        id: bookId
      }
    }
    const res = {
      json: jest.fn()
    }

    await rentController.rentBook(req, res)

    expect(res.json).toHaveBeenCalledWith('Book is already rented')
  })

  it('should update book document and return updated book if book is not rented', async () => {
    const bookId = '123'
    const bookData = {
      is_rent: false
    }
    const updatedBookData = {
      is_rent: true
    }
    Book.findById.mockResolvedValue(bookData)
    Book.findByIdAndUpdate.mockResolvedValue(updatedBookData)

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

    await rentController.rentBook(req, res)

    expect(Book.findByIdAndUpdate).toHaveBeenCalledWith(
      bookId,
      req.body,
      { new: true }
    )
    expect(res.json).toHaveBeenCalledWith(updatedBookData)
  })

  it('should update book if devolution', async () => {
    const bookId = '123'
    const bookData = {
      is_rent: true
    }
    const updatedBookData = {
      is_rent: false
    }
    Book.findById.mockResolvedValue(bookData)
    Book.findByIdAndUpdate.mockResolvedValue(updatedBookData)

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

    await rentController.devolution(req, res)

    expect(Book.findByIdAndUpdate).toHaveBeenCalledWith(
      bookId,
      req.body,
      { new: true }
    )
    expect(res.json).toHaveBeenCalledWith(updatedBookData)
  })
})
