/* eslint-disable eqeqeq */
const { PlantacaoService } = require('../services')
const plantacaoService = new PlantacaoService()
// TODO: Migrar esse service pra dentro do PlantacaoService
// Pra isso preciso inserir errors como middlewares

class PlantacaoController {
  // TODO: Se lembrar de depois, quando deletar
  // uma planta, deletar a relação com a plantacao tbm
  // Lembrar de dar console nos erros
  static async findAll (req, res, next) {
    try {
      const plantacoes = await plantacaoService.findAll()
      return res.status(200).send(plantacoes)
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    const { id } = req.params

    try {
      await plantacaoService.delete(id)

      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  static async insert (req, res, next) {
    const plantacao = req.body
    try {
      const newPlantacao = await plantacaoService.create(plantacao, plantacao.solo_id)
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
      await plantacaoService.addPlanta(plantaId, plantacaoId)

      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  static async findById (req, res, next) {
    try {
      const { id } = req.params

      const plantacao = await plantacaoService.findById(id)

      return res.status(200).send(plantacao)
    } catch (error) {
      next(error)
    }
  }

  static async getPlantasFromPlantacao (req, res, next) {
    try {
      const { id } = req.params

      const plantas = await plantacaoService.getPlantas(id)
      return res.status(200).send(plantas)
    } catch (error) {
      next(error)
    }
  }

  static async getPlantaFromPlantacao (req, res, next) {
    const plantaId = req.params.planta_id
    const plantacaoId = req.params.plantacao_id

    try {
      const planta = await plantacaoService.getPlanta(plantaId, plantacaoId)

      return res.status(200).send(planta)
    } catch (error) {
      next(error)
    }
  }

  static async getSoloFromPlantacao (req, res, next) {
    const soloId = req.params.solo_id
    const plantacaoId = req.params.plantacao_id

    try {
      const solo = await plantacaoService.getSolo(soloId, plantacaoId)
      return res.status(200).send(solo)
    } catch (error) {
      next(error)
    }
  }

  static async deletePlantaFromPlantacao (req, res, next) {
    const plantaId = req.params.planta_id
    const plantacaoId = req.params.plantacao_id

    try {
      await plantacaoService.deletePlanta(plantaId, plantacaoId)
      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PlantacaoController
