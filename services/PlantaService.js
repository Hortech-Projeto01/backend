const { NotFound } = require('../errors')
const database = require('../models')
const Services = require('./Services')

class PlantaService extends Services {
  constructor () {
    super('Planta')
    this.doencas = new Services('Doenca')
  }

  async getDoencas (idPlanta) {
    const planta = await super.findById(idPlanta)
    return await planta.getDoencas()
  }

  async addDoenca (idPlanta, idDoenca) {
    await this.doencas.findById(idDoenca)
    const planta = await super.findById(idPlanta)
    return await planta.addDoenca(idDoenca)
  }

  async getDoenca (idDoenca, idPlanta) {
    const planta = await super.findById(idPlanta)
    const doenca = await this.doencas.findById(idDoenca)
    if (!planta.doenca(doenca.id)) {
      throw new NotFound('PlantaDoenca')
    }
    return doenca
  }

  async deleteDoenca (idDoenca, idPlanta) {
    const planta = await super.findById(idPlanta)
    return await planta.removeDoenca(idDoenca)
  }

  async findById (id) {
    const planta = await database.Planta.findOne({
      where: {
        id
      },
      include: [{ model: database.Doenca, as: 'doencas' }]
    })

    if (!planta) {
      throw new NotFound(this.nomeModelo)
    }
    return planta
  }
}

module.exports = PlantaService
