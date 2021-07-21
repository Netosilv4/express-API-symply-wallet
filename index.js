const express = require('express')

const cors = require('cors')

const route = require('./routes/routes')

const app = express()

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send({ message: "Tudo 10" })
})

app.use(route)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}`))