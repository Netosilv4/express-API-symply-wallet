
const jwt = require('jsonwebtoken');

const { getUser } = require('../models/userModels')

const secret = process.env.HOST_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (id, login) => {
  const token = jwt.sign({ data: { id, login } }, secret, jwtConfig);
  return token
}

const tokenCheck = async (req, res, next) => {
  if (!req.body.login) return (res.status(401).json({ message: "Login não informado " }))
  const token = req.headers['authorization']
  if (!token) return (res.status(401).json({ message: "Token não informado" }))
  const split = token.split(' ')
  const decoded = jwt.verify(split[1], secret)
  const user = await getUser(null, decoded.data.id);
  if (!user) {
    return res
      .status(401)
      .json({ message: 'Erro ao procurar usuário do token.' });
  }
  if (req.body.login !== decoded.data.login) return (res.status(401).json({ message: "Usuario não bate com o token" }))
  next()
}

module.exports = {
  generateToken,
  tokenCheck
}
