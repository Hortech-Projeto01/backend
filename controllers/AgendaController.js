const { AgendaService, PlantacaoService } = require('../services')
const agendaService = new AgendaService()
const plantacaoService = new PlantacaoService()


class AgendaController {
  // TODO: findAll, update -> @Vitor Done
  // TODO: findById, delete -> @Dacio
  // agenda deve ter checagem para a foreign key plantação id em create


  static async update (req, res) {
    const fields = req.body
    const { id } = req.params

    try {
      const plantacaoResp = await plantacaoService.findById(fields.plantacao_id)
      if(plantacaoResp == 0){
        return res.status(404).send()
      }
      const resp = await agendaService.update(fields, id)
      if (resp == 0) {
        return res.status(404).send()
      }
      const updatedAgenda = await agendaService.findById(id)
      return res.status(200).send(updatedAgenda)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async findAll(req, res){
    try{
      const agendas = await agendaService.findAll()
      if(agendas == 0){
        return res.status(404).send()
      }
      return res.status(200).send(agendas)
    } catch{
      return res.status(500).json(error.message)
    }
  }

  static async delete (req, res) {
    const { id } = req.params

    try {
      const resp = await agendaService.delete(id)
      // eslint-disable-next-line eqeqeq
      if (resp == 0) {
        return res.status(404).send()
      }
      return res.status(200).send()
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async insert (req, res) {
    const agenda = req.body
    try {
      const newAgenda = await agendaService.create(agenda)
      return res.status(201).send(newAgenda)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = AgendaController
