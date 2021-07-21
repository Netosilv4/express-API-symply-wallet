const pg = require('pg')

const client = new pg.Client({
  user: process.env.USER_KEY,
  host: process.env.HOST_KEY,
  database: process.env.DATABASE_KEY,
  password: process.env.PASSWORD_KEY,
  port: process.env.PORT,
})

client.connect();

module.exports = {
  client,
}
