const express = require('express')

const route = require('./routes/routes')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send(`${process.env.USER_KEY} 
  ${process.env.HOST_KEY} 
  ${process.env.DATABASE_KEY} 
  ${process.env.PASSWORD_KEY}`)
})

app.use(route)

const PORT = process.env.PORT || 3010

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}`))