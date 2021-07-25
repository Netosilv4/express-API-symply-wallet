const { ObjectId } = require('mongodb')
const { client } = require('./connection')

const logIn = async (login) => {
  const data = await client.db(process.env.HOST_ONE).collection(process.env.HOST_TWO).findOne(
    { "login": login }, { projection: { "login": 1, "firstName": 1, "lastName": 1 } }
  )
  return data
}

const getUser = async (login, id) => {
  const data = await client.db(process.env.HOST_ONE).collection(process.env.HOST_TWO).findOne(
    {
      $or: [{ "login": `${login}` }, { "_id": ObjectId(id) }]
    }
        ,
    { projection: { "login": 1, "password": 1 } }
  );
  return data
}

const register = async (info) => {
  const back = await client.db(process.env.HOST_ONE).collection(process.env.HOST_TWO).insertOne({ ...info })
  return back
}

const postPayment = async (info) => {
  const back = await client.db(process.env.HOST_ONE).collection(process.env.HOST_TREE).insertOne({ ...info })
  return back
}

const getPayment = async (info) => {
  const back = await client.db(process.env.HOST_ONE).collection(process.env.HOST_TREE).find({ "user": info }).toArray()
  return back
}

const getPaymentId = async (info) => {
  const back = await client.db(process.env.HOST_ONE).collection(process.env.HOST_TREE).deleteOne({ "_id": ObjectId(info) })
  return back
}

const updatePayment = async (info) => {
  const back = await client.db(process.env.HOST_ONE).collection(process.env.HOST_TREE).updateOne({ "_id": ObjectId(info.id) }, { $set: { ...info } })
  return back
}

module.exports = {
  getUser,
  register,
  logIn,
  postPayment,
  getPayment,
  getPaymentId,
  updatePayment
}