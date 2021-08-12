class InvalidInput extends Error {
  constructor (errorBody) {
    super(errorBody)
    this.name = 'EntradaInvalida'
    this.idErro = 1
  }
}
module.exports = InvalidInput
