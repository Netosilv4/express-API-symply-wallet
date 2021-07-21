const express = require('express')

const { sendUser } = require('../controllers/usersControllers')

const route = express.Router()

route.post('/users', sendUser)

module.exports = route