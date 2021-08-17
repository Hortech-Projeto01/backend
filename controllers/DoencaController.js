/* eslint-disable eqeqeq */
const { DoencaService } = require('../services')
const doencaService = new DoencaService()

class DoencaController {
  // Quando deletar (tanto doenca quanto planta)
  // Lembrar de deletar a relação

  static async findAll (req, res, next) {
    try {
      const size = req.query.size
      const page = req.query.page
      const doencas = await doencaService.findAll(size, page)
      return res.status(200).send(doencas)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    const fields = req.body
    const { id } = req.params

    try {
      await doencaService.update(fields, id)
      const updatedDoenca = await doencaService.findById(id)
      return res.status(200).send(updatedDoenca)
    } catch (error) {
      next(error)
    }
  }

  static async findById (req, res, next) {
    try {
      const { id } = req.params
      const doenca = await doencaService.findById(id)
      return res.status(200).send(doenca)
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    const { id } = req.params

    try {
      await doencaService.delete(id)
      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  static async getPlantasFromDoenca (req, res, next) {
    try {
      const { id } = req.params
      const plantas = await doencaService.getPlantas(id)
      return res.status(200).send(plantas)
    } catch (error) {
      next(error)
    }
  }

  static async insert (req, res, next) {
    const doenca = req.body
    try {
      const newDoenca = await doencaService.create(doenca)
      return res.status(201).send(newDoenca)
    } catch (error) {
      next(error)
    }
  }
}
module.exports = DoencaController
