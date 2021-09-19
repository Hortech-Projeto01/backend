/* eslint-disable eqeqeq */
const { PlantacaoService } = require('../services')
const plantacaoService = new PlantacaoService()

class PlantacaoController {
  // Proteger
  static async findAll (req, res, next) {
    try {
      const size = req.query.size
      const page = req.query.page
      const plantacoes = await plantacaoService.findAll(size, page)
      return res.status(200).send(plantacoes)
    } catch (error) {
      next(error)
    }
  }

  static async findAllByUsuario (req, res, next) {
    try {
      const size = req.query.size
      const page = req.query.page
      const plantacoes = await plantacaoService.findAllByUsuario(
        req.user.id,
        size,
        page
      )
      return res.status(200).send(plantacoes)
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    const { id } = req.params

    try {
      await plantacaoService.delete(id, req.user.id)

      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  static async insert (req, res, next) {
    const plantacao = req.body
    plantacao.usuario_id = req.user.id
    try {
      const newPlantacao = await plantacaoService.create(
        plantacao,
        plantacao.solo_id
      )
      return res.status(201).send(newPlantacao)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    const fields = req.body
    const { id } = req.params

    try {
      await plantacaoService.update(fields, id, fields.solo_id)
      const updatedEntity = await plantacaoService.findById(id)
      return res.status(200).send(updatedEntity)
    } catch (error) {
      next(error)
    }
  }

  static async addPlantaToPlantacao (req, res, next) {
    const plantaId = req.params.planta_id
    const plantacaoId = req.params.plantacao_id

    try {
      await plantacaoService.addPlanta(
        plantaId,
        plantacaoId,
        req.user.id
      )

      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  // Proteger
  static async findById (req, res, next) {
    try {
      const { id } = req.params

      const plantacao = await plantacaoService.findById(id, req.user.id)

      return res.status(200).send(plantacao)
    } catch (error) {
      next(error)
    }
  }

  static async getPlantasFromPlantacao (req, res, next) {
    try {
      const { id } = req.params

      const plantas = await plantacaoService.getPlantas(id, req.user.id)
      return res.status(200).send(plantas)
    } catch (error) {
      next(error)
    }
  }

  static async getPlantaFromPlantacao (req, res, next) {
    const plantaId = req.params.planta_id
    const plantacaoId = req.params.plantacao_id

    try {
      const planta = await plantacaoService.getPlanta(
        plantaId,
        plantacaoId,
        req.user.id
      )

      return res.status(200).send(planta)
    } catch (error) {
      next(error)
    }
  }

  static async getSoloFromPlantacao (req, res, next) {
    const soloId = req.params.solo_id
    const plantacaoId = req.params.plantacao_id

    try {
      const solo = await plantacaoService.getSolo(
        soloId,
        plantacaoId,
        req.user.id
      )
      return res.status(200).send(solo)
    } catch (error) {
      next(error)
    }
  }

  static async deletePlantaFromPlantacao (req, res, next) {
    const plantaId = req.params.planta_id
    const plantacaoId = req.params.plantacao_id

    try {
      await plantacaoService.deletePlanta(
        plantaId,
        plantacaoId,
        req.user.id
      )
      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  static async findDoencaByPlanta (req, res, next) {
    const plantaId = req.params.planta_id
    const plantacaoId = req.params.plantacao_id
    const doencaId = req.params.doenca_id

    try {
      const doenca = await plantacaoService.findDoencaByPlanta(
        plantacaoId,
        plantaId,
        doencaId,
        req.user.id
      )
      return res.status(200).send(doenca)
    } catch (error) {
      next(error)
    }
  }

  static async insertDoencaInPlanta (req, res, next) {
    const plantaId = req.params.planta_id
    const plantacaoId = req.params.plantacao_id
    const doencaId = req.params.doenca_id

    try {
      await plantacaoService.insertDoencaInPlanta(
        plantacaoId,
        plantaId,
        doencaId,
        req.user.id
      )
      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  static async deleteDoencaFromPlanta (req, res, next) {
    const plantaId = req.params.planta_id
    const plantacaoId = req.params.plantacao_id
    const doencaId = req.params.doenca_id

    try {
      await plantacaoService.deleteDoencaFromPlanta(
        plantacaoId,
        plantaId,
        doencaId,
        req.user.id
      )
      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  static async findAllDoencasByPlantacao (req, res, next) {
    const plantacaoId = req.params.plantacao_id
    const size = req.query.size
    const page = req.query.page

    try {
      const doencas = await plantacaoService.findAllDoencasByPlantacao(
        plantacaoId,
        req.user.id,
        size,
        page
      )
      return res.status(200).send(doencas)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PlantacaoController
