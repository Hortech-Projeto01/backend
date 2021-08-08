const Services = require('./Services')

class DoencaService extends Services {
  constructor () {
    super('Doenca')
  }

  async getPlantas (idDoenca) {
    const doenca = await super.findById(idDoenca)
    if (!doenca) {
      return 0
    }
    return await doenca.getPlantas()
  }
}

module.exports = DoencaService
