const validate = (login, password) => {
  if (!login) return { code: 422, message: 'Usuario não informado' }
  if (!password) return { code: 422, message: 'Senha não informada' }
  if (login.length < 4) return { code: 422, message: 'Usuario inválido' }
  if (password.length < 5) return { code: 422, message: 'Senha inválida' }
  return {}
}

const validateRegister = (password, email, firstName, lastName, login) => {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if (!password || !email || !firstName || !lastName || !login) return { code: 422, message: 'Preencha todos os campos' }
  if (password.length < 5) return { code: 422, message: 'Senha inválida' }
  if (/\s/g.test(password)) return { code: 422, message: 'Senha contém espaços' }
  if (/\s/g.test(login)) return { code: 422, message: 'Usuario contém com espaços' }
  if (/\s/g.test(email)) return { code: 422, message: 'Email contém com espaços' }
  if (login.length < 5) return { code: 422, message: "Usuario inválido" }
  if (email.length < 5) return { code: 422, message: "Email inválido" }
  if (!re.test(email)) return { code: 422, message: "Email fora do formato aceitavel" }
  return { code: 200, message: "Todos os campos são válidos" }
}


module.exports = {
  validate,
  validateRegister
}