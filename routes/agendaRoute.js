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
// Operacoes sobre agenda
router.get('/user/agendas/:plantacao_id&:day&:name',
  [passport.authenticate('jwt', { session: false })],
  AgendaController.getOneIrrigation)
router.get('/user/agendas/date/:plantacao_id&:day&:name',
  [passport.authenticate('jwt', { session: false })],
  AgendaController.getDate)
router.get('/user/agendas/:plantacao_id&:day',
  [passport.authenticate('jwt', { session: false })],
  AgendaController.getAllIrrigationsFromADay)
router.put('/user/agendas/irrigated/:plantacao_id&:day&:name',
  [passport.authenticate('jwt', { session: false })],
  AgendaController.changeIrrigated)

module.exports = router
