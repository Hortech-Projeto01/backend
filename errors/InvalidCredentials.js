class InvalidCredentials extends Error {
  constructor (info) {
    super(`Email ou senha inválidos: ${info}`)
    this.name = 'CredencialInvalida'
    this.idErro = 2
  }
}

module.exports = InvalidCredentials
