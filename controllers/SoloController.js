/* eslint-disable eqeqeq */
const { SoloService } = require('../services')
const soloService = new SoloService()

class SoloController {
  static async findAll (req, res, next) {
    try {
      const size = req.query.size
      const page = req.query.page
      const solos = await soloService.findAll(size, page)
      return res.status(200).send(solos)
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    const { id } = req.params

    try {
      await soloService.delete(id)
      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    const fields = req.body
    const { id } = req.params

    try {
      await soloService.update(fields, id)
      const updatedEntity = await soloService.findById(id)
      return res.status(200).send(updatedEntity)
    } catch (error) {
      next(error)
    }
  }

  static async insert (req, res, next) {
    const solo = req.body
    try {
      const newSolo = await soloService.create(solo)
      return res.status(201).send(newSolo)
    } catch (error) {
      next(error)
    }
  }

  static async findById (req, res, next) {
    try {
      const { id } = req.params

      const solo = await soloService.findById(id)
      return res.status(200).send(solo)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = SoloController
