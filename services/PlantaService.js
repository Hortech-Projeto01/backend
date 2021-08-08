const database = require('../models')
const Services = require('./Services')

class PlantaService extends Services {
  constructor () {
    super('Planta')
    this.doencas = new Services('Doenca')
  }

  async getDoencas (idPlanta) {
    const planta = await super.findById(idPlanta)
    if (!planta) {
      return 0
    }
    return await planta.getDoencas()
  }

  async addDoenca (idPlanta, idDoenca) {
    const planta = await super.findById(idPlanta)
    return await planta.addDoenca(idDoenca)
  }

  async getDoenca (idDoenca, idPlanta) {
    const planta = await super.findById(idPlanta)
    if (!planta) {
      return null
    }
    return await this.doencas.findById(idDoenca)
  }

  async deleteDoenca (idDoenca, idPlanta) {
    const planta = await super.findById(idPlanta)
    if (!planta) {
      return 0
    }
    return await planta.removeDoenca(idDoenca)
  }

  async findById (id) {
    return database.Planta.findOne({
      where: {
        id
      },
      include: [{ model: database.Doenca, as: 'doencas' }]
    })
  }
}

module.exports = PlantaService
