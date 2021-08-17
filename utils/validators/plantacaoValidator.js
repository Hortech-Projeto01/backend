/* eslint-disable eqeqeq */
const validator = require('validator')
const { InvalidInput } = require('../../errors')

const schema = {
  solo_id: value => !validator.isEmpty(value) && validator.isUUID(value, [4])
}

const matchSchema = (object) => Object
  .keys(schema)
  .filter(key => {
    if (!object[key] && key == 'solo_id') {
      return true
    }
    return !schema[key](object[key] + '')
  })
  .map(key => key)

const validate = (object) => {
  const errors = matchSchema(object)
  const examples = {
    solo_id: '[not null] 4ba2c700-5c5c-473d-b0c8-aff79e36c4d4'
  }

  const objError = {}
  objError.errors = errors
  objError.example = examples

  if (errors.length > 0) {
    throw new InvalidInput(JSON.stringify(objError))
  }
}

module.exports = validate
