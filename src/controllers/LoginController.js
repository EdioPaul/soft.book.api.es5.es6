const User = require('../models/User')

const EXPIRE_TOKEN = 3600
const jwt = require('jsonwebtoken')

module.exports = {
  async login (req, res) {
    try {
      const user = await User.find(req.body)
      if (user) {
        const id = user.id
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: EXPIRE_TOKEN
        })
        return res.json({ auth: true, token })
      } else {
        res.status(500).json({ message: 'Invalid login!' })
      }
    } catch (err) {
      throw new Error(err.message)
    }
  },

  async logout (res) {
    res.json({ auth: false, token: null })
  }
}
