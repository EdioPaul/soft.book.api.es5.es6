const requireDir = require('require-dir')
const mongoose = require('mongoose')
const routes = require('./routes')
const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

requireDir('./models')

app.use('/api', routes)

const server = app.listen(process.env.PORT)

module.exports = server
