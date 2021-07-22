const { getUser, register, logIn, postPayment, getPayment  } = require('../models/userModels')

const validate = (user, password) => {
  if (!user) return { code: 422, message: 'Usuario não informado' }
  if (!password) return { code: 422, message: 'Senha não informada' }
  if (user.length < 4) return { code: 422, message: 'Usuario inválido' }
  if (password.length < 5) return { code: 422, message: 'Senha inválida' }
  return {}
}

const userLogin = async (info) => {

  const { user, password } = info

  const isValid = validate(user, password)

  if (isValid.message) return isValid

  let data = await logIn(user, password)

  if (!data) return { code: 422, message: 'Usuario não encontrado !' }

  return { code: 200, message: 'Usuario conectado', info: { ...data } }
}

const validateRegister = (password, email, firstName, lastName, user) => {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if (!password || !email || !firstName || !lastName || !user) return { code: 422, message: 'Preencha todos os campos' }
  if (password.length < 5) return { code: 422, message: 'Senha inválida' }
  if (/\s/g.test(password)) return { code: 422, message: 'Senha contém espaços' }
  if (/\s/g.test(user)) return { code: 422, message: 'Usuario contém com espaços' }
  if (/\s/g.test(email)) return { code: 422, message: 'Email contém com espaços' }
  if (user.length < 5) return { code: 422, message: "Usuario inválido" }
  if (email.length < 5) return { code: 422, message: "Email inválido" }
  if (!re.test(email)) return { code: 422, message: "Email fora do formato aceitavel" }
  return { code: 200, message: "Todos os campos são válidos" }
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
  return { code: 200, payments: { ...back } }
}

module.exports = {
  userLogin,
  authRegister,
  paymentAuth,
  paymentRequest,
}