/* eslint-disable eqeqeq */
const validator = require('validator')
const { InvalidInput } = require('../../errors')

const schema = {
  nome: value => validator.isAlpha(value, 'pt-BR', { ignore: ' ' }),
  transmissao: value => validator.isAlpha(value, 'pt-BR', { ignore: ' ' }),
  prevencao: value => validator.isAlpha(value, 'pt-BR', { ignore: ' ' }),
  tratamento: value => validator.isAlpha(value, 'pt-BR', { ignore: ' ' })
}

const matchSchema = (object) => Object
  .keys(schema)
  .filter(key => {
    if (!object[key] && key == 'nome') {
      return true
    }
    return !schema[key](object[key] + '')
  })
  .map(key => key)

const validate = (object) => {
  const errors = matchSchema(object)
  const examples = {
    nome: 'Mofo Cinzento',
    transmissao: 'ar',
    prevencao: 'controlar a temperatura e umidade',
    tratamento: 'usar adubo especifico'
  }

  const objError = {}
  objError.errors = errors
  objError.example = examples

  if (errors.length > 0) {
    throw new InvalidInput(JSON.stringify(objError))
  }
}

module.exports = validate
