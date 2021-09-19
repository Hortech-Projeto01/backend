const { Router } = require('express')
const PlantaController = require('../controllers/PlantaController')

const router = Router()
const passport = require('passport')
const roles = require('../middlewares/roles')
require('../middlewares/auth')

router.get('/plantas',
  [passport.authenticate('jwt', { session: false })],
  PlantaController.findAll)
router.post('/plantas',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantaController.create)
router.put('/plantas/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantaController.update)
router.delete('/plantas/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantaController.delete)
router.delete('/plantas/doencas/:planta_id/:doenca_id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantaController.deleteDoencaFromPlanta)
router.put('/plantas/doencas/:planta_id/:doenca_id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantaController.addDoencaToPlanta)
router.get('/plantas/doencas/:planta_id/:doenca_id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantaController.getDoencaFromPlanta)
router.get('/plantas/doencas/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantaController.getDoencasFromPlanta)
router.get('/plantas/:id',
  [passport.authenticate('jwt', { session: false })],
  PlantaController.findById)

module.exports = router
