const UserController = require('../src/controllers/LoginController')
const User = require('../src/models/User')
const jwt = require('jsonwebtoken')

jest.mock('../src/models/User')
jest.mock('jsonwebtoken')

describe('UserController', () => {
  describe('login', () => {
    it('should return a token if the login is valid', async () => {
      const mockedUser = {
        id: '123',
        password: '123',
        email: 'teste@teste.com'
      }
      User.find.mockImplementationOnce(() => Promise.resolve(mockedUser))
      jwt.sign.mockImplementationOnce(() => 'jwt-token')

      const req = { body: { id: mockedUser.id, password: mockedUser.password } }
      const res = { json: jest.fn() }

      await UserController.login(req, res)

      expect(User.find).toHaveBeenCalledWith({ id: mockedUser.id, password: mockedUser.password })
      expect(jwt.sign).toHaveBeenCalledWith({ id: mockedUser.id }, process.env.SECRET, { expiresIn: 3600 })
      expect(res.json).toHaveBeenCalledWith({ auth: true, token: 'jwt-token' })
    })

    it('should return an error if the login is invalid', async () => {
      User.find.mockImplementationOnce(() => Promise.resolve(null))

      const req = { body: { id: 'invalid-user-id', password: 'invalid-password' } }
      const res = { status: jest.fn(() => res), json: jest.fn() }

      await UserController.login(req, res)

      expect(User.find).toHaveBeenCalledWith({ id: 'invalid-user-id', password: 'invalid-password' })
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid login!' })
    })
  })

  describe('logout', () => {
    it('should return an empty token', () => {
      const res = { json: jest.fn() }
      UserController.logout(res)
      expect(res.json).toHaveBeenCalledWith({ auth: false, token: null })
    })
  })
})
