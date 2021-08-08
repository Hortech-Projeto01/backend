const { Router } = require('express')
const SoloController = require('../controllers/SoloController')

const router = Router()

router.put('/solos/:id', SoloController.update)
router.post('/solos', SoloController.insert)
router.delete('/solos/:id', SoloController.delete)
router.get('/solos', SoloController.findAll)

module.exports = router
