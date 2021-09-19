const Services = require('./Services')
const database = require('../models')
const { NotFound } = require('../errors')
const { plantacaoValidator } = require('../utils/validators')
const { Op } = require('sequelize')
const agendaUtils = require('../utils/agendaUtils/agendaUtils')

class PlantacaoService extends Services {
  constructor () {
    super('Plantacao')
    this.plantas = new Services('Planta')
    this.doenca = new Services('Doenca')
    this.solo = new Services('Solo')
    this.agenda = new Services('Agenda')
  }

  async findAllByUsuario (userId, size = 5, page = 0) {
    const parsedSize = parseInt(size)
    const parsedPage = parseInt(page)

    if (isNaN(parsedSize) || isNaN(parsedPage)) {
      throw new NotFound(this.nomeModelo)
    }
    const allObjects = await database.Plantacao.findAndCountAll({
      where: {
        usuario_id: userId
      },
      limit: parsedSize,
      offset: parsedPage * parsedSize,
      order: [['updatedAt', 'DESC']]
    })
    allObjects.currentPage = parsedPage + 1
    return allObjects
  }

  async addPlanta (idPlanta, idPlantacao, idUser) {
    await this.plantas.findById(idPlanta)
    const plantacao = await super.findById(idPlantacao, idUser)
    if (!plantacao) {
      throw new NotFound(this.nomeModelo)
    }
    return await plantacao.addPlanta(idPlanta)
  }

  async getPlantas (idPlantacao, idUser) {
    const plantacao = await this.findById(idPlantacao, idUser)
    if (!plantacao) {
      throw new NotFound(this.nomeModelo)
    }
    return await plantacao.getPlantas()
  }

  async create (plantacao, soloId) {
    plantacaoValidator(plantacao)
    await this.solo.findById(soloId)

    const newPlantacao = await super.create(plantacao)

    const horario = agendaUtils.agendaHorario
    await this.agenda.create({
      horario,
      plantacao_id: newPlantacao.id
    })
    return newPlantacao
  }

  async update (data, id, idSolo, transacao = {}) {
    plantacaoValidator(data)

    const count = await database[this.nomeModelo].update(
      data,
      { where: { id } },
      transacao
    )

    // eslint-disable-next-line eqeqeq
    if (count == 0) {
      throw new NotFound(this.nomeModelo)
    }
    return count
  }

  async getPlanta (idPlanta, idPlantacao, idUser) {
    const plantacao = await this.findById(idPlantacao, idUser)
    if (!plantacao) {
      throw new NotFound(this.nomeModelo)
    }
    const planta = await this.plantas.findById(idPlanta)
    if (!(await plantacao.hasPlanta(planta))) {
      throw new NotFound('PlantacaoPlanta')
    }
    return await this.plantas.findById(idPlanta)
  }

  async getSolo (idSolo, idPlantacao, userId) {
    const plantacao = await this.findById(idPlantacao, userId)
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

  async deletePlanta (idPlanta, idPlantacao, userId) {
    const plantacao = await this.findById(idPlantacao, userId)
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

  async findById (id, userId) {
    const plantacao = await database.Plantacao.findOne({
      where: {
        id,
        usuario_id: userId
      },
      include: [{ model: database.Planta, as: 'plantas' }, database.Solo]
    })
    if (!plantacao) {
      throw new NotFound(this.nomeModelo)
    }
    return plantacao
  }

  async findDoencaByPlanta (idPlantacao, idPlanta, idDoenca, idUser) {
    const plantacao = await this.findById(idPlantacao, idUser)
    const planta = await this.plantas.findById(idPlanta)
    // eslint-disable-next-line prefer-const
    let doenca = await this.doenca.findById(idDoenca)

    const plantacaoPlanta = await database.PlantacaoPlanta.findOne({
      where: {
        planta_id: planta.id,
        plantacao_id: plantacao.id,
        doenca_id: doenca.id
      }
    })
    if (!plantacaoPlanta) {
      throw new NotFound('PlantacaoPlanta')
    }
    doenca.doencaCreatedAt = plantacaoPlanta.doenca_createdAt
    return doenca
  }

  async findAllDoencasByPlantacao (idPlantacao, idUser, size, page) {
    const plantacao = await this.findById(idPlantacao, idUser)

    const plantacaoPlanta = await database.PlantacaoPlanta.findAll({
      where: {
        plantacao_id: plantacao.id,
        doenca_id: { [Op.ne]: null }
      }
    })

    const idDoencas = []

    plantacaoPlanta.forEach((element) => {
      idDoencas.push(element.doenca_id)
    })

    return this.doenca.findAll(size, page, { id: idDoencas })
  }

  async insertDoencaInPlanta (idPlantacao, idPlanta, idDoenca, idUser) {
    const plantacao = await this.findById(idPlantacao, idUser)
    const planta = await this.plantas.findById(idPlanta)
    const doenca = await this.doenca.findById(idDoenca)
    const date = new Date().toISOString()
    const plantacaoPlanta = await database.PlantacaoPlanta.update(
      { doenca_id: doenca.id, doenca_createdAt: date },
      {
        where: {
          planta_id: planta.id,
          plantacao_id: plantacao.id
        }
      }
    )
    // eslint-disable-next-line eqeqeq
    if (plantacaoPlanta == 0) {
      throw new NotFound('PlantacaoPlanta')
    }
  }

  async deleteDoencaFromPlanta (idPlantacao, idPlanta, idDoenca, idUser) {
    const plantacao = await this.findById(idPlantacao, idUser)
    const planta = await this.plantas.findById(idPlanta)
    await this.doenca.findById(idDoenca)

    const plantacaoPlanta = await database.PlantacaoPlanta.update(
      { doenca_id: null, doenca_createdAt: null },
      {
        where: {
          planta_id: planta.id,
          plantacao_id: plantacao.id
        }
      }
    )
    // eslint-disable-next-line eqeqeq
    if (plantacaoPlanta == 0) {
      throw new NotFound('PlantacaoPlanta')
    }
  }

  async delete (id, userId) {
    const count = await database.Plantacao.destroy({
      where: {
        id,
        usuario_id: userId
      }
    })

    // eslint-disable-next-line eqeqeq
    if (count == 0) {
      throw new NotFound(this.nomeModelo)
    }
    return count
  }
}

module.exports = PlantacaoService
