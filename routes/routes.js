const express = require('express')

const rescue = require('express-rescue')

const { sendUser, registerUser, newPayment, searchPayments, deletePayment, editPayment } = require('../controllers/usersControllers')

const { tokenCheck } = require('../middlewares/jwt')

const route = express.Router()

route.post('/users', rescue(sendUser))

route.post('/register', rescue(registerUser))

route.post('/newpayment', rescue(tokenCheck), rescue(newPayment))

route.post('/searchpayments', rescue(tokenCheck), rescue(searchPayments))

route.post('/deletepayment', rescue(tokenCheck), rescue(deletePayment))

route.post('/editpayment', rescue(tokenCheck), rescue(editPayment))


const genericError = async (err, req, res, next) => {
  res.status(404).json({ message: `${err}` })
}

route.use(genericError)

module.exports = route