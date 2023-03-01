const SearchController = require('../src/controllers/SearchController')
const Book = require('../src/models/Book')

jest.mock('../src/models/Book', () => ({
  find: jest.fn()
}))

describe('search function', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all books when no filter is provided', async () => {
    const mockBooks = [{ title: 'Book 1' }, { title: 'Book 2' }]

    Book.find.mockResolvedValueOnce(mockBooks)

    const req = { query: {} }
    const res = { json: jest.fn() }

    await SearchController.search(req, res)

    expect(Book.find).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(mockBooks)
  })

  it('should return books filtered by query parameters', async () => {
    const mockBooks = [{ title: 'Book 1' }, { title: 'Book 2' }]

    Book.find.mockResolvedValueOnce(mockBooks)

    const req = { query: { title: 'Book 1' } }
    const res = { json: jest.fn() }

    await SearchController.search(req, res)

    expect(Book.find).toHaveBeenCalledTimes(1)
    expect(Book.find).toHaveBeenCalledWith({ title: 'Book 1' })
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(mockBooks)
  })

  it('should throw an error when an error occurs', async () => {
    const mockError = new Error('Error searching for books.')

    Book.find.mockRejectedValueOnce(mockError)

    const req = { query: {} }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }

    await SearchController.search(req, res)

    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
