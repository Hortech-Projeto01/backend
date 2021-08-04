const Services = require('./Services')
const database = require('../models')

class PlantacaoService extends Services {
  constructor () {
    super('Plantacao')
    this.plantas = new Services('Planta')
  }

  async addPlanta (idPlanta, idPlantacao) {
    const plantacao = await super.findById(idPlantacao)
    return await plantacao.addPlanta(idPlanta)
  }

  async findById (id) {
    return database.Plantacao.findOne({
      where: {
        id
      },
      include: [{ model: database.Planta, as: 'plantas' }, database.Solo]
    })
  }
}

module.exports = PlantacaoService
