const { Router } = require('express')
const AgendaController = require('../controllers/AgendaController')

const router = Router()

router.get('/agendas', AgendaController.findAll)
router.put('/agendas/:id', AgendaController.update)
router.get('/agendas/:id', AgendaController.findById)
// router.post('/agendas', AgendaController.insert)

module.exports = router
