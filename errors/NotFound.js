class NotFound extends Error {
  constructor (name) {
    super(`Recurso ${name} nao encontrado`)
    this.name = 'NaoEncontrado'
    this.idErro = 0
  }
}

module.exports = NotFound
