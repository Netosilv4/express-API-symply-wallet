const { client } = require('./connection')

const logIn = async (user, password) => {
  const data = await client.db(`${process.env.HOST_ONE}`).collection(`${process.env.HOST_TWO}`).findOne(
    { "user_login": user, "user_password": password }, { projection: { "user_login": 1, "first_name": 1, "last_name": 1, "user_password": 1 } }
  )
  return data
}

const getUser = async (user, email) => {
  const data = await client.db(`${process.env.HOST_ONE}`).collection(`${process.env.HOST_TWO}`).findOne(
    {
      $or: [{ "user_login": `${user}` },
      { "user_email": `${email}` }]
    },
    { projection: { "user_login": 1 } }
  );
  return data
}

const register = async (info) => {
  const back = await client.db(`${process.env.HOST_ONE}`).collection(`${process.env.HOST_TWO}`).insertOne({ ...info })
  return back
}

const postPayment = async (info) => {
  const back = await client.db(`${process.env.HOST_ONE}`).collection(`${process.env.HOST_TREE}`).insertOne({ ...info })
  return back
}

const getPayment = async (info) => {
  const back = await client.db(`${process.env.HOST_ONE}`).collection(`${process.env.HOST_TREE}`).find({ "user": info })
  return back
}

module.exports = {
  getUser,
  register,
  logIn,
  postPayment,
  getPayment
}