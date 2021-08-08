const Services = require('./Services')
const database = require('../models')

class PlantacaoService extends Services {
  constructor () {
    super('Plantacao')
    this.plantas = new Services('Planta')
    this.solo = new Services('Solo')
    this.agenda = new Services('Agenda')
  }

  async addPlanta (idPlanta, idPlantacao) {
    const plantacao = await super.findById(idPlantacao)
    if (!plantacao) {
      return 0
    }
    return await plantacao.addPlanta(idPlanta)
  }

  async getPlantas (idPlantacao) {
    const plantacao = await super.findById(idPlantacao)
    if (!plantacao) {
      return 0
    }
    return await plantacao.getPlantas()
  }

  async create (plantacao) {
    const newPlantacao = await super.create(plantacao)

    const time = new Date()
    const horario = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    await this.agenda.create({
      horario,
      plantacao_id: newPlantacao.id
    })
    return newPlantacao
  }

  async getPlanta (idPlanta, idPlantacao) {
    const plantacao = await super.findById(idPlantacao)
    if (!plantacao) {
      return null
    }
    return await this.plantas.findById(idPlanta)
  }

  async getSolo (idSolo, idPlantacao) {
    const plantacao = await super.findById(idPlantacao)
    if (!plantacao) {
      return null
    }
    return await this.solo.findById(idSolo)
  }

  async deletePlanta (idPlanta, idPlantacao) {
    const plantacao = await super.findById(idPlantacao)
    if (!plantacao) {
      return 0
    }
    return await plantacao.removePlanta(idPlanta)
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
