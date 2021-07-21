const { userLogin, authRegister } = require('../services/usersServices')

const sendUser = async (req, res) => {
  let data = await userLogin(req.body)
  res.status(200).json(data)
}

const registerUser = async (req, res) => {
  const call = await authRegister(req.body)
  res.status(200).json(call)
}

module.exports = {
  sendUser,
  registerUser,
}