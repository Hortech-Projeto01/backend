const { DoencaService } = require('../services')
const doencaService = new DoencaService()

class DoencaController {
  // TODO: findall, update -> @Vitor Done
  // TODO: delete, findById -> @Dacio

  static async findAll(req, res){
    try{
      const doencas = await doencaService.findAll()
      if(doencas == 0){
        return res.status(404).send()
      }
      return res.status(200).send(doencas)
    } catch{
      return res.status(500).json(error.message)
    }
  }

  static async update (req, res) {
    const fields = req.body
    const { id } = req.params

    try {
      const resp = await doencaService.update(fields, id)
      if (resp == 0) {
        return res.status(404).send()
      }
      const updatedDoenca = await doencaService.findById(id)
      return res.status(200).send(updatedDoenca)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async findById (req, res) {
    try {
      const { id } = req.params

      const doenca = await doencaService.findById(id)
      if (!doenca) {
        return res.status(404).send(doenca)
      }
      return res.status(200).send(doenca)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async insert (req, res) {
    const doenca = req.body
    try {
      const newDoenca = await doencaService.create(doenca)
      return res.status(201).send(newDoenca)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}
module.exports = DoencaController
