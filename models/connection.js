const { MongoClient } = require('mongodb');

const uri = process.env.HOST_URI

const client = new MongoClient(uri);

client.connect();

module.exports = {
  client,
}
