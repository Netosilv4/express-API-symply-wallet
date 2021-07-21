const { authUser } = require('../services/usersServices')

const sendUser = async (req, res) => {
  let data = await authUser(req.body)
  res.status(200).json(data)
}

module.exports = {
  sendUser,
}