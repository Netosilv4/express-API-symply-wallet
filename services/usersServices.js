const { getUser, register, logIn, postPayment, getPayment, getPaymentId, updatePayment } = require('../models/userModels')
const { validate, validateRegister } = require('../schema/index')
const { generateToken } = require('../middlewares/jwt')

const bcrypt = require('bcrypt')

const userLogin = async (info) => {

  const { login, password } = info

  const isValid = validate(login, password)

  if (isValid.message) return isValid

  const exists = await getUser(login.toLowerCase())

  if (!exists) return { code: 422, message: "Usuario não encontrado" }

  const match = bcrypt.compareSync(password, exists.password);

  if (!match) return { code: 422, message: 'Senha inválida' }

  let data = await logIn(login.toLowerCase())

  return { code: 200, message: 'Usuario conectado', info: { ...data, token: generateToken(data._id, data.login) } }
}


const authRegister = async ({ password, email, firstName, lastName, login }) => {

  const isValid = validateRegister(password,
    email,
    firstName,
    lastName,
    login)

  if (isValid.code === 422) return { ...isValid }

  const isUnique = await getUser(login.toLowerCase())

  if (isUnique) {
    if (isUnique.login === login.toLowerCase()) return { code: 422, message: "Usuario já cadastrado" }
    if (isUnique.email === email.toLowerCase()) return { code: 422, message: "Email já cadastrado" }
  }

  const userData = {
    password: bcrypt.hashSync(password, 10),
    email: email.toLowerCase(),
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    login: login.toLowerCase()
  }

  const back = await register({ ...userData })

  return { code: 200, message: 'Usuario Cadastrado', id: `${back.insertedId}` }
}

const paymentAuth = async (info) => {
  const back = await postPayment(info)
  return { code: 200, message: "Pagamento Cadastrado", id: `${back.insertedId}` }
}

const paymentRequest = async (info) => {
  const back = await getPayment(info.login)
  return {
    code: 200, payments: [...back]
  }
}

const deleteRequest = async (info) => {
  const back = await getPaymentId(info.id)
  return back.deletedCount !== 0 ? { code: 200, message: "Pagamento deletado" } : { code: 422, message: "Pagamento não encontrado" }
}

const editRequest = async (info) => {
  await updatePayment(info)
  return { code: 200, message: "Pagamento editado " }
}

module.exports = {
  userLogin,
  authRegister,
  paymentAuth,
  paymentRequest,
  deleteRequest,
  editRequest
}