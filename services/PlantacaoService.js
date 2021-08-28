const Services = require('./Services')
const database = require('../models')
const { NotFound } = require('../errors')
const { plantacaoValidator } = require('../utils/validators')

class PlantacaoService extends Services {
  constructor () {
    super('Plantacao')
    this.plantas = new Services('Planta')
    this.solo = new Services('Solo')
    this.agenda = new Services('Agenda')
  }

  async addPlanta (idPlanta, idPlantacao) {
    await this.plantas.findById(idPlanta)
    const plantacao = await super.findById(idPlantacao)
    if (!plantacao) {
      throw new NotFound(this.nomeModelo)
    }
    return await plantacao.addPlanta(idPlanta)
  }

  async getPlantas (idPlantacao) {
    const plantacao = await super.findById(idPlantacao)
    if (!plantacao) {
      throw new NotFound(this.nomeModelo)
    }
    return await plantacao.getPlantas()
  }

  async create (plantacao, soloId) {
    plantacaoValidator(plantacao)

    await this.solo.findById(soloId)

    const newPlantacao = await super.create(plantacao)

    const time = new Date()
    const horario = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    await this.agenda.create({
      horario,
      plantacao_id: newPlantacao.id
    })
    return newPlantacao
  }

  async update (data, id, idSolo, transacao = {}) {
    plantacaoValidator(data)

    const count = await database[this.nomeModelo].update(data, { where: { id } }, transacao)

    // eslint-disable-next-line eqeqeq
    if (count == 0) {
      throw new NotFound(this.nomeModelo)
    }
    return count
  }

  async getPlanta (idPlanta, idPlantacao) {
    const plantacao = await super.findById(idPlantacao)
    if (!plantacao) {
      throw new NotFound(this.nomeModelo)
    }
    const planta = await this.plantas.findById(idPlanta)
    if (!await plantacao.hasPlanta(planta)) {
      throw new NotFound('PlantacaoPlanta')
    }
    return await this.plantas.findById(idPlanta)
  }

  async getSolo (idSolo, idPlantacao) {
    const plantacao = await super.findById(idPlantacao)
    if (!plantacao) {
      throw new NotFound(this.nomeModelo)
    }
    const solo = await this.solo.findById(idSolo)
    // eslint-disable-next-line eqeqeq
    if (solo.id != plantacao.solo_id) {
      throw new NotFound(this.solo.nomeModelo)
    }
    return solo
  }

  async deletePlanta (idPlanta, idPlantacao) {
    const plantacao = await super.findById(idPlantacao)
    if (!plantacao) {
      throw new NotFound(this.nomeModelo)
    }
    const count = await plantacao.removePlanta(idPlanta)
    // eslint-disable-next-line eqeqeq
    if (count == 0) {
      throw new NotFound(this.plantas.nomeModelo)
    }
    return count
  }

  async findById (id) {
    const plantacao = await database.Plantacao.findOne({
      where: {
        id
      },
      include: [{ model: database.Planta, as: 'plantas' }, database.Solo]
    })
    if (!plantacao) {
      throw new NotFound(this.nomeModelo)
    }
    return plantacao
  }
}

module.exports = PlantacaoService
