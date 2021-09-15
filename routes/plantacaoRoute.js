const { Router } = require('express')
const PlantacaoController = require('../controllers/PlantacaoController')

const router = Router()
const passport = require('passport')
const roles = require('../middlewares/roles')
require('../middlewares/auth')

router.delete('/plantacoes/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantacaoController.delete)
router.delete('/plantacoes/plantas/:plantacao_id/:planta_id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantacaoController.deletePlantaFromPlantacao)
router.get('/plantacoes/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantacaoController.findById)
router.get('/plantacoes/plantas/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantacaoController.getPlantasFromPlantacao)
router.get('/plantacoes/plantas/:plantacao_id/:planta_id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantacaoController.getPlantaFromPlantacao)
router.get('/plantacoes/solos/:plantacao_id/:solo_id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantacaoController.getSoloFromPlantacao)
router.put('/plantacoes/:plantacao_id/:planta_id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantacaoController.addPlantaToPlantacao)
router.put('/plantacoes/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantacaoController.update)
router.post('/plantacoes',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantacaoController.insert)
router.get('/plantacoes',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantacaoController.findAll)
module.exports = router
