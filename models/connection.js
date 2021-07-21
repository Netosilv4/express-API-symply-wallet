const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://netosilv4:99550123aa@symply-wallet-database.whpgx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(uri);

client.connect();

module.exports = {
  client,
}
