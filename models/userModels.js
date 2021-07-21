const { client } = require('./connection')

const logIn = async (user, password) => {
  const data = await client.db('users').collection('users_info').findOne(
    { "user_login": user, "user_password": password }, { projection: { "user_login": 1, "first_name": 1, "last_name": 1 } }
  )
  return data
}

const getUser = async (user, email) => {
  const data = await client.db('users').collection('users_info').findOne(
    {
      $or: [{ "user_login": `${user}` },
      { "user_email": `${email}` }]
    },
    { projection: { "user_login": 1 } }
  );
  return data
}

const register = async (info) => {
    const back = await client.db('users').collection('users_info').insertOne({ ...info })
    return back
}

module.exports = {
  getUser,
  register,
  logIn
}