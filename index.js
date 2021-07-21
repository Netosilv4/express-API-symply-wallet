const express = require('express')

const route = require('./routes/routes')

const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send({ message: "Tudo 10" })
})

app.use(route)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}`))