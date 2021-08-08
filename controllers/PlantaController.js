/* eslint-disable eqeqeq */
const { PlantaService, DoencaService } = require('../services')
const plantaService = new PlantaService()
const doencaService = new DoencaService()

class PlantaController {
  // TODO: create, findall e update -> @Vitor Done
  // TODO: getDoencaByPlanta, insertDoenca e delete -> @Dacio
  // O campo especie deve ser var char

  static async create (req, res) {
    const planta = req.body
    try {
      const newPlanta = await plantaService.create(planta)
      return res.status(201).send(newPlanta)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async update (req, res) {
    const fields = req.body
    const { id } = req.params

    try {
      const resp = await plantaService.update(fields, id)
      if (resp == 0) {
        return res.status(404).send()
      }
      const updatedPlanta = await plantaService.findById(id)
      return res.status(200).send(updatedPlanta)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async findAll (req, res) {
    try {
      const plantas = await plantaService.findAll()
      if (plantas == 0) {
        return res.status(404).send()
      }
      return res.status(200).send(plantas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async delete (req, res) {
    const { id } = req.params

    try {
      const resp = await plantaService.delete(id)
      // eslint-disable-next-line eqeqeq
      if (resp == 0) {
        return res.status(404).send()
      }
      return res.status(200).send()
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async addDoencaToPlanta (req, res) {
    const plantaId = req.params.planta_id
    const doencaId = req.params.doenca_id

    try {
      const doenca = await doencaService.findById(doencaId)

      if (doenca == 0) {
        return res.status(404).send()
      }
      const planta = await plantaService.addDoenca(plantaId, doencaId)

      if (planta == 0) {
        return res.status(404).send()
      }
      return res.status(200).send()
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getDoencaFromPlanta (req, res) {
    const plantaId = req.params.planta_id
    const doencaId = req.params.doenca_id

    try {
      const planta = await plantaService.getDoenca(doencaId, plantaId)
      if (!planta) {
        return res.status(404).send()
      }
      return res.status(200).send(planta)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getDoencasFromPlanta (req, res) {
    try {
      const { id } = req.params

      const doencas = await plantaService.getDoencas(id)
      if (doencas == 0) {
        return res.status(404).send()
      }
      return res.status(200).send(doencas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deleteDoencaFromPlanta (req, res) {
    const plantaId = req.params.planta_id
    const doencaId = req.params.doenca_id

    try {
      const doenca = await plantaService.deleteDoenca(doencaId, plantaId)
      if (doenca == 0) {
        return res.status(404).send()
      }
      return res.status(200).send()
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async findById (req, res) {
    try {
      const { id } = req.params

      const planta = await plantaService.findById(id)
      if (!planta) {
        return res.status(404).send()
      }
      return res.status(200).send(planta)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}
module.exports = PlantaController
