/* eslint-disable eqeqeq */
const { PlantaService, DoencaService } = require('../services')
const plantaService = new PlantaService()
const doencaService = new DoencaService()

class PlantaController {
  // TODO: create, findall e update -> @Vitor Done
  // TODO: getDoencaByPlanta, insertDoenca e delete -> @Dacio
  // O campo especie deve ser var char

  static async create (req, res, next) {
    const planta = req.body
    try {
      const newPlanta = await plantaService.create(planta)
      return res.status(201).send(newPlanta)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    const fields = req.body
    const { id } = req.params

    try {
      await plantaService.update(fields, id)
      const updatedPlanta = await plantaService.findById(id)
      return res.status(200).send(updatedPlanta)
    } catch (error) {
      next(error)
    }
  }

  static async findAll (req, res, next) {
    try {
      const plantas = await plantaService.findAll()
      return res.status(200).send(plantas)
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    const { id } = req.params

    try {
      await plantaService.delete(id)
      // eslint-disable-next-line eqeqeq
      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  static async addDoencaToPlanta (req, res, next) {
    const plantaId = req.params.planta_id
    const doencaId = req.params.doenca_id

    try {
      await doencaService.findById(doencaId)
      await plantaService.addDoenca(plantaId, doencaId)
      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  static async getDoencaFromPlanta (req, res, next) {
    const plantaId = req.params.planta_id
    const doencaId = req.params.doenca_id

    try {
      const planta = await plantaService.getDoenca(doencaId, plantaId)
      return res.status(200).send(planta)
    } catch (error) {
      next(error)
    }
  }

  static async getDoencasFromPlanta (req, res, next) {
    try {
      const { id } = req.params

      const doencas = await plantaService.getDoencas(id)
      return res.status(200).send(doencas)
    } catch (error) {
      next(error)
    }
  }

  static async deleteDoencaFromPlanta (req, res, next) {
    const plantaId = req.params.planta_id
    const doencaId = req.params.doenca_id

    try {
      await plantaService.deleteDoenca(doencaId, plantaId)
      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  static async findById (req, res, next) {
    const { id } = req.params
    try {
      const planta = await plantaService.findById(id)
      return res.status(200).send(planta)
    } catch (error) {
      next(error)
    }
  }
}
module.exports = PlantaController
