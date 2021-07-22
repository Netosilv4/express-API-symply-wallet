const { userLogin, authRegister, paymentAuth, paymentRequest } = require('../services/usersServices')

const sendUser = async (req, res) => {
  let data = await userLogin(req.body)
  res.status(200).json(data)
}

const registerUser = async (req, res) => {
  const call = await authRegister(req.body)
  res.status(200).json(call)
}

const newPayment = async (req, res) => {
  const pay = await paymentAuth(req.body)
  res.status(200).json(pay)
}

const searchPayments = async (req, res) => {
  const payments = await paymentRequest(req.body)
  res.status(200).json(payments)
}
module.exports = {
  sendUser,
  registerUser,
  newPayment,
  searchPayments
}