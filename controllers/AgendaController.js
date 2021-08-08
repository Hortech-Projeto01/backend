const { AgendaService, PlantacaoService } = require('../services')
const agendaService = new AgendaService()
const plantacaoService = new PlantacaoService()

class AgendaController {
  static async update (req, res) {
    const fields = req.body
    const { id } = req.params

    try {
      const plantacaoResp = await plantacaoService.findById(fields.plantacao_id)
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
      const agendas = await agendaService.findAll()
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
}

module.exports = AgendaController
