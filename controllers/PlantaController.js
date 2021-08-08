// const Sequelize = require('sequelize')
const { PlantaService } = require('../services')
const plantaService = new PlantaService()

class PlantaController {
  // TODO: create, findall e update -> @Vitor Done
  // TODO: getDoencaByPlanta, insertDoenca e delete -> @Dacio
  // O campo especie deve ser var char
  
 

  static async create(req,res){
    const planta = req.body
    try {
      const newPlanta = await plantaService.create(planta)
      return res.status(201).send(newPlanta)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async update(req, res){
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

  static async findAll(req, res){
    try{
      const plantas = await plantaService.findAll()
      if(plantas == 0){
        return res.status(404).send()
      }
      return res.status(200).send(plantas)
    } catch(error){
      return res.status(500).json(error.message)
    }
  }


}
module.exports = PlantaController
