/* eslint-disable eqeqeq */
const validator = require('validator')
const { InvalidInput } = require('../../errors')

const schema = {
  email: value => !validator.isEmpty(value) && validator.isEmail(value),
  nome: value => !validator.isEmpty(value) && validator.isAlpha(value, 'pt-BR', { ignore: ' ' }),
  senha: value => !validator.isEmpty(value)
}

const matchSchema = (object) => Object
  .keys(schema)
  .filter(key => {
    if (!object[key]) {
      return false
    }
    return !schema[key](object[key] + '')
  })
  .map(key => key)

const validate = (object) => {
  const errors = matchSchema(object)
  const examples = {
    email: 'joao@hotmail.com',
    nome: 'João Silva',
    senha: 'Joao123'
  }

  const objError = {}
  objError.errors = errors
  objError.example = examples

  if (errors.length > 0) {
    throw new InvalidInput(JSON.stringify(objError))
  }
}

module.exports = validate

//   {
//     "email": "docinho@hotmail.com",
//     "nome": "Docinho",
//     "senha": "something"
// }
