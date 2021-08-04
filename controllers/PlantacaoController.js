/* eslint-disable eqeqeq */
const { PlantacaoService, SoloService, PlantaService } = require('../services')
const plantacaoService = new PlantacaoService()
// TODO: Migrar esse service pra dentro do PlantacaoService
// Pra isso preciso inserir errors como middlewares
const soloService = new SoloService()
const plantaService = new PlantaService()

class PlantacaoController {
  // TODO: create agenda e delete agenda @Dacio
  // TODO: findAll -> @Vitor
  // TODO: testar delete
  static async delete (req, res) {
    const { id } = req.params

    try {
      const resp = await plantacaoService.delete(id)
      if (resp == 0) {
        return res.status(404).send()
      }
      return res.status(200).send()
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async insert (req, res) {
    const plantacao = req.body
    try {
      const resp = await soloService.findById(plantacao.solo_id)
      if (resp == 0) {
        return res.status(404).send()
      }
      const newPlantacao = await plantacaoService.create(plantacao)
      return res.status(201).send(newPlantacao)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async update (req, res) {
    const fields = req.body
    const { id } = req.params

    try {
      const soloResp = await soloService.findById(fields.solo_id)
      if (soloResp == 0) {
        return res.status(404).send()
      }
      const resp = await plantacaoService.update(fields, id)
      if (resp == 0) {
        return res.status(404).send()
      }
      const updatedEntity = await plantacaoService.findById(id)
      return res.status(200).send(updatedEntity)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async addPlantaToPlantacao (req, res) {
    const plantaId = req.params.planta_id
    const plantacaoId = req.params.plantacao_id

    try {
      const planta = await plantaService.findById(plantaId)

      if (planta == 0) {
        return res.status(404).send()
      }
      const plantacao = await plantacaoService.addPlanta(plantaId, plantacaoId)
      console.log(plantacao)
      if (plantacao == 0) {
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

      const plantacao = await plantacaoService.findById(id)
      if (!plantacao) {
        return res.status(404).send()
      }
      return res.status(200).send(plantacao)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PlantacaoController
