const { Router } = require('express')
const PlantacaoController = require('../controllers/PlantacaoController')

const router = Router()

router.delete('/plantacoes/:id', PlantacaoController.delete)
router.get('/plantacoes/:id', PlantacaoController.findById)
router.put('/plantacoes/:plantacao_id/:planta_id', PlantacaoController.addPlantaToPlantacao)
router.put('/plantacoes/:id', PlantacaoController.update)
router.post('/plantacoes', PlantacaoController.insert)

module.exports = router
