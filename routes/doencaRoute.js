const { Router } = require('express')
const DoencaController = require('../controllers/DoencaController')

const router = Router()

router.get('/doencas/:id', DoencaController.findById)
router.delete('/doencas/:id', DoencaController.delete)
router.get('/doencas/plantas/:id', DoencaController.getPlantasFromDoenca)
router.post('/doencas', DoencaController.insert)
router.get('/doencas', DoencaController.findAll)
router.put('/doencas/:id', DoencaController.update)
module.exports = router
