const { AgendaService, PlantacaoService } = require('../services')
const Services = require('../services/Services')
const agendaService = new AgendaService()
const plantacaoService = new PlantacaoService()
const cron = require('node-cron')
const agendaUtils = require('../utils/agendaUtils/agendaUtils')
const emailUtils = require('../utils/agendaUtils/emailsUtils')

cron.schedule('* * * * *', async () => {
  const listAgendas = await agendaService.findAllWithoutCount()
  listAgendas.forEach(async (agenda) => {
    const horario = agenda.horario
    // Deixar dinamico
    const day = new Date().getDay()
    const irrigationsByDay = agendaUtils.getAllIrrigationsFromADay(
      horario,
      day
    )
    const plantacaoService = new Services('Plantacao')
    const plantacao = await plantacaoService.findById(agenda.plantacao_id)
    const userServices = new Services('Usuario')
    const user = await userServices.findById(plantacao.usuario_id)
    const email = user.email

    irrigationsByDay.forEach(async (irrigation) => {
      const currentDate = new Date().toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
      })
      if (irrigation.time) {
        if (currentDate > irrigation.time && !irrigation.irrigated) {
          await emailUtils.sendGridEmail(email)
          await agendaService.changeIrrigated(
            plantacao.id,
            user.id,
            day,
            irrigation.name,
            true
          )
        }
      }
    })
  })
})

cron.schedule('0 0 * * *', async () => {
  const listAgendas = await agendaService.findAllWithoutCount()
  listAgendas.forEach(async (agenda) => {
    const day = new Date().getDay()
    const horario = agenda.horario
    const irrigationsByDay = agendaUtils.getAllIrrigationsFromADay(
      horario,
      day
    )
    const plantacaoService = new Services('Plantacao')
    const plantacao = await plantacaoService.findById(agenda.plantacao_id)
    const userServices = new Services('Usuario')
    const user = await userServices.findById(plantacao.usuario_id)

    irrigationsByDay.forEach(async (irrigation) => {
      await agendaService.changeIrrigated(
        plantacao.id,
        user.id,
        day,
        irrigation.name,
        false
      )
    })
    console.log('All irrigation statuses have been reset.')
  })
})

class AgendaController {
  static async update (req, res) {
    const fields = req.body
    const { id } = req.params

    try {
      const plantacaoResp = await plantacaoService.findById(
        fields.plantacao_id
      )
      // eslint-disable-next-line eqeqeq
      if (plantacaoResp == 0) {
        return res.status(404).send()
      }
      const resp = await agendaService.update(fields, id)
      // eslint-disable-next-line eqeqeq
      if (resp == 0) {
        return res.status(404).send()
      }
      const updatedAgenda = await agendaService.findById(id)
      return res.status(200).send(updatedAgenda)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async findAll (req, res) {
    try {
      const size = req.query.size
      const page = req.query.page
      const agendas = await agendaService.findAllWithoutCount(size, page)
      // eslint-disable-next-line eqeqeq
      if (agendas == 0) {
        return res.status(404).send()
      }
      return res.status(200).send(agendas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async findById (req, res) {
    try {
      const { id } = req.params

      const agenda = await agendaService.findById(id)
      if (!agenda) {
        return res.status(404).send()
      }
      return res.status(200).send(agenda)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getAllIrrigationsFromADay (req, res, next) {
    try {
      const irrigations = await agendaService.getAllIrrigationsFromADay(
        req.params.plantacao_id,
        req.user.id,
        req.params.day
      )
      return res.status(200).send(irrigations)
    } catch (error) {
      next(error)
    }
  }

  static async getAgendaFromPlantacao (req, res, next) {
    try {
      const agenda = await agendaService.getAgendaFromPlantacao(
        req.params.plantacao_id,
        req.user.id
      )
      return res.status(200).send(agenda)
    } catch (error) {
      next(error)
    }
  }

  static async getAgendasFromUsuario (req, res, next) {
    try {
      const agendas = await agendaService.getAllAgendasFromUsuario(
        req.user.id
      )
      return res.status(200).send(agendas)
    } catch (error) {
      next(error)
    }
  }

  static async getOneIrrigation (req, res, next) {
    try {
      const irrigation = await agendaService.getOneIrrigation(
        req.params.plantacao_id,
        req.user.id,
        req.params.day,
        req.params.name
      )
      return res.status(200).send(irrigation)
    } catch (error) {
      next(error)
    }
  }

  static async getDate (req, res, next) {
    try {
      const date = await agendaService.getDate(
        req.params.plantacao_id,
        req.user.id,
        req.params.day,
        req.params.name
      )
      return res.status(200).send(date)
    } catch (error) {
      next(error)
    }
  }

  static async changeIrrigated (req, res, next) {
    try {
      const date = await agendaService.changeIrrigated(
        req.params.plantacao_id,
        req.user.id,
        req.params.day,
        req.params.name,
        req.body.irrigated
      )
      return res.status(200).send(date)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AgendaController
