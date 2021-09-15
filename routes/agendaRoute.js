const { Router } = require('express')
const AgendaController = require('../controllers/AgendaController')

const router = Router()
const passport = require('passport')
const roles = require('../middlewares/roles')
require('../middlewares/auth')

router.get('/agendas',
  [passport.authenticate('jwt', { session: false }), roles],
  AgendaController.findAll)
router.put('/agendas/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  AgendaController.update)
router.get('/agendas/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  AgendaController.findById)
// router.post('/agendas',
//   [passport.authenticate('jwt', { session: false }), roles],
//   AgendaController.insert)

module.exports = router
