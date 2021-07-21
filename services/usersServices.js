const { getUser } = require('../models/userModels')

const validate = (user, password) => {
  if (!user) return { code: 422, message: 'Usuario não informado' }
  if (!password) return { code: 422, message: 'Senha não informada' }
  if (user.length < 4) return { code: 422, message: 'Usuario inválido' }
  if (password.length < 5) return { code: 422, message: 'Senha inválida' }
  return {}
}

const authUser = async (info) => {

  console.log('cheguei no auth')

  const { user, password } = info

  const isValid = validate(user, password)

  if (isValid.message) return isValid

  let data = await getUser(user, password)

  if (!data) return { code: 422, message: 'Usuario não encontrado !' }

  return { code: 200, message: 'Usuario conectado', info: { ...data } }
}

module.exports = {
  authUser,
}