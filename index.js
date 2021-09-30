require('dotenv').config()
const express = require('express')
const errors = require('./middlewares/errors')
const routes = require('./routes')
const cors = require('cors')
require('./middlewares/auth')

const app = express()
app.use(express.json())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))

routes(app)

app.use(errors)

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log('Servidor up na porta 3001')
})

module.exports = app
