const { Router } = require('express')
const PlantaController = require('../controllers/PlantaController')

const router = Router()

router.get('/plantas', PlantaController.findAll)
router.post('/plantas', PlantaController.create)
router.put('/plantas/:id', PlantaController.update)
router.delete('/plantas/:id', PlantaController.delete)
router.delete('/plantas/doencas/:planta_id/:doenca_id', PlantaController.deleteDoencaFromPlanta)
router.put('/plantas/doencas/:planta_id/:doenca_id', PlantaController.addDoencaToPlanta)
router.get('/plantas/doencas/:planta_id/:doenca_id', PlantaController.getDoencaFromPlanta)
router.get('/plantas/doencas/:id', PlantaController.getDoencasFromPlanta)
router.get('/plantas/:id', PlantaController.findById)

module.exports = router
