/* eslint-disable eqeqeq */
const { PlantacaoService, SoloService, PlantaService } = require('../services')
const plantacaoService = new PlantacaoService()
// TODO: Migrar esse service pra dentro do PlantacaoService
// Pra isso preciso inserir errors como middlewares
const soloService = new SoloService()
const plantaService = new PlantaService()

class PlantacaoController {
  // TODO: Se lembrar de depois, quando deletar
  // uma planta, deletar a relação com a plantacao tbm
  // Lembrar de dar console nos erros
  static async findAll (req, res) {
    try {
      const plantacoes = await plantacaoService.findAll()
      if (plantacoes == 0) {
        return res.status(404).send()
      }
      return res.status(200).send(plantacoes)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

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
      if (!resp) {
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
      if (!soloResp) {
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

      if (!planta) {
        return res.status(404).send()
      }
      const plantacao = await plantacaoService.addPlanta(plantaId, plantacaoId)

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

  static async getPlantasFromPlantacao (req, res) {
    try {
      const { id } = req.params

      const plantas = await plantacaoService.getPlantas(id)
      if (plantas == 0) {
        return res.status(404).send()
      }
      return res.status(200).send(plantas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getPlantaFromPlantacao (req, res) {
    const plantaId = req.params.planta_id
    const plantacaoId = req.params.plantacao_id

    try {
      const planta = await plantacaoService.getPlanta(plantaId, plantacaoId)
      if (!planta) {
        return res.status(404).send()
      }
      return res.status(200).send(planta)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getSoloFromPlantacao (req, res) {
    const soloId = req.params.solo_id
    const plantacaoId = req.params.plantacao_id

    try {
      const solo = await plantacaoService.getSolo(soloId, plantacaoId)
      if (!solo) {
        return res.status(404).send()
      }
      return res.status(200).send(solo)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deletePlantaFromPlantacao (req, res) {
    const plantaId = req.params.planta_id
    const plantacaoId = req.params.plantacao_id

    try {
      const planta = await plantacaoService.deletePlanta(plantaId, plantacaoId)
      if (planta == 0) {
        return res.status(404).send()
      }
      return res.status(200).send()
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PlantacaoController
