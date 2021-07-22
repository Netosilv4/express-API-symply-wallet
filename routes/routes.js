const express = require('express')

const { sendUser, registerUser, newPayment, searchPayments } = require('../controllers/usersControllers')

const route = express.Router()

route.post('/users', sendUser)

route.post('/register', registerUser)

route.post('/newpayment', newPayment)

route.post('/searchpayments', searchPayments)

module.exports = route