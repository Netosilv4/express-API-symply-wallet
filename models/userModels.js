const { client } = require('./connection')

const getUser = async (user, password) => {
  const [data] = (await client.query(`SELECT * FROM users.users_info WHERE user_login = '${user}' AND user_password = '${password}'`)).rows
  return data
}

module.exports = {
  getUser,
}