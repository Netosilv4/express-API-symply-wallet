const express = require('express')

const { sendUser, registerUser } = require('../controllers/usersControllers')

const route = express.Router()

route.get('/users', sendUser)

route.post('/register', registerUser)

module.exports = route