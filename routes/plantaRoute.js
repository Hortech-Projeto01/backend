const { Router } = require('express')
const PlantaController = require('../controllers/PlantaController')

const router = Router()

router.get('/plantas', PlantaController.findAll)
router.post('/plantas', PlantaController.create)
router.put('/plantas/:id', PlantaController.update)

module.exports = router
