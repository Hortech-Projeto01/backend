/* eslint-disable eqeqeq */
const { SoloService } = require('../services')
const soloService = new SoloService()

class SoloController {
  static async findAll (req, res) {
    try {
      const solos = await soloService.findAll()
      if (solos == 0) {
        return res.status(404).send()
      }
      return res.status(200).send(solos)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async delete (req, res) {
    const { id } = req.params

    try {
      const resp = await soloService.delete(id)
      if (resp == 0) {
        return res.status(404).send()
      }
      return res.status(200).send()
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async update (req, res) {
    const fields = req.body
    const { id } = req.params

    try {
      const resp = await soloService.update(fields, id)
      // eslint-disable-next-line eqeqeq
      if (resp == 0) {
        return res.status(404).send()
      }
      const updatedEntity = await soloService.findById(id)
      return res.status(200).send(updatedEntity)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async insert (req, res) {
    const solo = req.body
    try {
      const newSolo = await soloService.create(solo)
      return res.status(201).send(newSolo)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async findById (req, res) {
    try {
      const { id } = req.params

      const solo = await soloService.findById(id)
      if (!solo) {
        return res.status(404).send(solo)
      }
      return res.status(200).send(solo)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = SoloController
