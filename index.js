const express = require('express')
const errors = require('./middlewares/errors')
const routes = require('./routes')

const app = express()
app.use(express.json())

routes(app)

app.use(errors)

const port = 3001

app.listen(port, () => {
  console.log('Servidor up na porta 3001')
})

module.exports = app
