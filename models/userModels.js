const { client } = require('./connection')

const getUser = async (user, password) => {
  const data = await client.db('users').collection('users_info').findOne(
    { "user_login" : `${user}` },
    { "user_login" : 1}
);
  return data
}

module.exports = {
  getUser,
}