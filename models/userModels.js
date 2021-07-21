const { client } = require('./connection')

const getUser = async (user, password) => {
  console.log('cheguei no get')
  const [data] = (await client.query(`SELECT * FROM users.users_info WHERE user_login = '${user}' AND user_password = '${password}'`)).rows
  console.log(data)
  return data
}

module.exports = {
  getUser,
}