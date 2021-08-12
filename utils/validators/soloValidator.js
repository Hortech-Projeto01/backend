/* eslint-disable eqeqeq */
const validator = require('validator')
const { InvalidInput } = require('../../errors')

const tipoSolo = ['TIPOA', 'TIPOB', 'TIPOC']
const tipoVaso = ['TIPOA', 'TIPOB', 'TIPOC']

const schema = {
  nivel_ph: value => !validator.isEmpty(value) && validator.isFloat(value, { min: 0.0, max: 14.0 }),
  tipo_solo: value => tipoSolo.includes(value) && validator.isAlpha(value),
  temperatura: value => validator.isFloat(value, { min: -100.0, max: 100.0 }),
  tipo_vaso: value => tipoVaso.includes(value) && validator.isAlpha(value)

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
    nivel_ph: 7.0,
    tipo_solo: 'TIPOB',
    temperatura: 38.3,
    tipo_vaso: 'TIPOA'
  }

  const objError = {}
  objError.errors = errors
  objError.example = examples

  if (errors.length > 0) {
    throw new InvalidInput(JSON.stringify(objError))
  }
}

module.exports = validate
