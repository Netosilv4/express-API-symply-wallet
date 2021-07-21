const pg = require('pg')

const client = new pg.Client({
  user: 'bbghysbgvfomha',
  host: 'ec2-52-1-20-236.compute-1.amazonaws.com',
  database: 'dejloahcvn3abg',
  password: 'f7479f594e3b632184d75883f22bf868709374864cd5d15e1a9972f8aab2018b',
  port: process.env.PORT,
  ssl: { rejectUnauthorized: false }
})

client.connect();

module.exports = {
  client,
}
