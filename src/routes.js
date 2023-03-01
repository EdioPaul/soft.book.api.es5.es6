const verifyJWT = require('./utils/verifyJWT')
const express = require('express')

const BookController = require('./controllers/BookController')
const DetailController = require('./controllers/DetailController')
const LoginController = require('./controllers/LoginController')
const RentController = require('./controllers/RentController')
const SearchController = require('./controllers/SearchController')

const routes = express.Router()

routes.get('/', function (_req, res) {
  res.send('API SoftBook')
})

routes.post('/login', LoginController.login)
routes.post('/logout', LoginController.logout)

routes.get('/detail/:id', verifyJWT, DetailController.detail)

routes.put('/rent/:id', verifyJWT, RentController.rentBook)
routes.put('/devolution/:id', verifyJWT, RentController.devolution)

routes.get('/search', verifyJWT, SearchController.search)

routes.post('/book', verifyJWT, BookController.create)
routes.put('/book/:id', verifyJWT, BookController.update)
routes.delete('/book/:id', verifyJWT, BookController.remove)

module.exports = routes
