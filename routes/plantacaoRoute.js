const { Router } = require('express')
const PlantacaoController = require('../controllers/PlantacaoController')

const router = Router()

router.delete('/plantacoes/:id', PlantacaoController.delete)
router.delete('/plantacoes/plantas/:plantacao_id/:planta_id', PlantacaoController.deletePlantaFromPlantacao)
router.get('/plantacoes/:id', PlantacaoController.findById)
router.get('/plantacoes/plantas/:id', PlantacaoController.getPlantasFromPlantacao)
router.get('/plantacoes/plantas/:plantacao_id/:planta_id', PlantacaoController.getPlantaFromPlantacao)
router.get('/plantacoes/solos/:plantacao_id/:solo_id', PlantacaoController.getSoloFromPlantacao)
router.put('/plantacoes/:plantacao_id/:planta_id', PlantacaoController.addPlantaToPlantacao)
router.put('/plantacoes/:id', PlantacaoController.update)
router.post('/plantacoes', PlantacaoController.insert)
router.get('/plantacoes', PlantacaoController.findAll)
module.exports = router
