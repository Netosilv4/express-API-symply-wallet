const { getUser, register, logIn, postPayment, getPayment, getPaymentId, updatePayment } = require('../models/userModels')
const { validate, validateRegister } = require('../schema/index')

const userLogin = async (info) => {

  const { user, password } = info

  const isValid = validate(user, password)

  if (isValid.message) return isValid

  let data = await logIn(user, password)

  if (!data) return { code: 422, message: 'Usuario não encontrado !' }

  return { code: 200, message: 'Usuario conectado', info: { ...data } }
}


const authRegister = async ({ password, email, firstName, lastName, user }) => {

  const isValid = validateRegister(password, email, firstName, lastName, user)

  if (isValid.code === 422) return { ...isValid }

  const isUnique = await getUser(user, email)

  if (isUnique) {
    if (isUnique.user_login === user) return { code: 422, message: "Usuario já cadastrado" }
    if (isUnique.user_email === email) return { code: 422, message: "Email já cadastrado" }
  }

  const userData = {
    user_password: password,
    user_email: email,
    first_name: firstName,
    last_name: lastName,
    user_login: user
  }

  const back = await register({ ...userData })

  return { code: 200, message: 'Usuario Cadastrado', id: `${back.insertedId}` }
}

const paymentAuth = async (info) => {
  const auth = await getUser(info.user, info.password)
  if (!auth) return { code: 422, message: "Não foi possivel cadastrar pagamento, verifique suas credenciais e se está logado" }
  const back = await postPayment(info)
  return { code: 200, message: "Pagamento Cadastrado", id: `${back.insertedId}` }
}

const paymentRequest = async (info) => {
  const auth = await getUser(info.user, info.password)
  if (!auth) return { code: 422, message: "Não foi possivel recuperar pagamentos" }
  const back = await getPayment(info.user)
  return {
    code: 200, payments: [...back]
  }
}

const deleteRequest = async (info) => {
  const auth = await getUser(info.user, info.password)
  if (!auth) return { code: 422, message: "Não foi possivel acessar pagamentos" }
  const back = await getPaymentId(info.id)
  return back.deletedCount !== 0 ? { code: 200, message: "Pagamento deletado" } : { code: 422, message: "Pagamento não encontrado" }
}

const editRequest = async (info) => {
  const auth = await getUser(info.user, info.password)
  if (!auth) return { code: 422, message: "Não foi possivel acessar pagamentos" }
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