const express = require('express')
const rescue = require('express-rescue')

const error = (err, req, res, next) => {
  res.status(500).json({ error: "Internal error" })
}

const { sendUser, registerUser, newPayment, searchPayments, deletePayment, editPayment } = require('../controllers/usersControllers')

const route = express.Router()

route.post('/users', rescue(sendUser))

route.post('/register', rescue(registerUser))

route.post('/newpayment', rescue(newPayment))

route.post('/searchpayments', rescue(searchPayments))

route.post('/deletepayment', rescue(deletePayment))

route.post('/editpayment', rescue(editPayment))

route.use(error)

module.exports = route