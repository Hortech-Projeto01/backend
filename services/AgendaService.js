const Services = require('./Services')
const PlantacaoService = require('./PlantacaoService')
const agendaUtils = require('../utils/agendaUtils/agendaUtils')
const database = require('../models')

class AgendaService extends Services {
  constructor () {
    super('Agenda')
    this.plantacao = new Services('Plantacao')
  }

  async findAllWithoutCount () {
    const allObjects = await database.Agenda.findAll()
    return allObjects
  }

  async getAgendaFromPlantacao (plantacaoId, userId) {
    const plantacao = await this.plantacao.findById(plantacaoId, userId)
    const agenda = await plantacao.getAgenda()
    return agenda
  }

  async getAllAgendasFromUsuario (userId) {
    const pService = new PlantacaoService()
    const plantacoes = await pService.findAllByUsuarioNoOffset(userId)
    const agendas = await Promise.all(plantacoes.map(async (plantacao) => {
      const agenda = await plantacao.getAgenda()
      return agenda
    }))
    return agendas
  }

  async getAllIrrigationsFromADay (plantacaoId, userId, day) {
    const plantacao = await this.plantacao.findById(plantacaoId, userId)
    const agenda = await plantacao.getAgenda()
    return agendaUtils.getAllIrrigationsFromADay(
      agenda.dataValues.horario,
      day
    )
  }

  async _getAgenda (plantacaoId, userId) {
    const plantacao = await this.plantacao.findById(plantacaoId, userId)
    const agenda = await plantacao.getAgenda()
    return agenda
  }

  async getOneIrrigation (plantacaoId, userId, day, name) {
    const agenda = await this._getAgenda(plantacaoId, userId)
    return agendaUtils.getOneIrrigation(
      agenda.dataValues.horario,
      day,
      name
    )
  }

  async getDate (plantacaoId, userId, day, name) {
    const agenda = await this._getAgenda(plantacaoId, userId)
    return {
      date: agendaUtils.getDate(agenda.dataValues.horario, day, name)
    }
  }

  async changeIrrigated (plantacaoId, userId, day, name, irrigated) {
    // eslint-disable-next-line eqeqeq
    if (typeof irrigated != 'boolean') {
      throw new Error('irrigated must be Boolean')
    }
    const agenda = await this._getAgenda(plantacaoId, userId)
    const newHorario = agendaUtils.changeIrrigated(
      agenda.dataValues.horario,
      day,
      name,
      irrigated
    )
    await database[this.nomeModelo].update({ horario: newHorario }, { where: { id: agenda.id } }, {})
    return newHorario
  }
}

module.exports = AgendaService
