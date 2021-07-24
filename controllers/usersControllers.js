const { userLogin, authRegister, paymentAuth, paymentRequest, deleteRequest, editRequest } = require('../services/usersServices')

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

const deletePayment = async (req, res) => {
  const deletePayment = await deleteRequest(req.body)
  res.status(200).json(deletePayment)
}

const editPayment = async (req, res) => {
  const editPayment = await editRequest(req.body)
  res.status(200).json(editPayment)
}
module.exports = {
  sendUser,
  registerUser,
  newPayment,
  searchPayments,
  deletePayment,
  editPayment
}