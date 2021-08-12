const { NotFound, InvalidInput } = require('../errors')

const errors = (error, req, res, next) => {
  if (error instanceof NotFound) {
    console.error(error.message)
    return res.status(404).send({ error: error.message, id: error.idErro })
  } else if (error instanceof InvalidInput) {
    return res.status(400).send({ error: JSON.parse(error.message), id: error.idErro })
  } else {
    console.error(error.stack)
    return res.status(500).send({ error: error.message })
  }
}

module.exports = errors
