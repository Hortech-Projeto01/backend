const { Router } = require('express')
const PlantacaoController = require('../controllers/PlantacaoController')

const router = Router()
const passport = require('passport')
const roles = require('../middlewares/roles')
require('../middlewares/auth')

router.delete('/user/plantacoes/:id',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.delete)
router.delete('/user/plantacoes/plantas/:plantacao_id/:planta_id',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.deletePlantaFromPlantacao)
router.get('/user/plantacoes',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.findAllByUsuario)
router.get('/user/plantacoes/:id',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.findById)
router.get('/user/plantacoes/plantas/:id',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.getPlantasFromPlantacao)
router.get('/user/plantacoes/plantas/:plantacao_id/:planta_id',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.getPlantaFromPlantacao)
router.get('/user/plantacoes/solos/:plantacao_id/:solo_id',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.getSoloFromPlantacao)
router.put('/user/plantacoes/:plantacao_id/:planta_id',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.addPlantaToPlantacao)
router.put('/user/plantacoes/:id',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.update)
router.post('/user/plantacoes',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.insert)
router.get('/plantacoes',
  [passport.authenticate('jwt', { session: false }), roles],
  PlantacaoController.findAll)
// Operacoes sobre doencas
router.get('/user/plantacoes/:plantacao_id/planta/:planta_id/doenca/:doenca_id',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.findDoencaByPlanta)
router.put('/user/plantacoes/:plantacao_id/planta/:planta_id/doenca/:doenca_id',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.insertDoencaInPlanta)
router.delete('/user/plantacoes/:plantacao_id/planta/:planta_id/doenca/:doenca_id',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.deleteDoencaFromPlanta)
router.get('/user/plantacoes/:plantacao_id/doencas',
  [passport.authenticate('jwt', { session: false })],
  PlantacaoController.findAllDoencasByPlantacao)
module.exports = router
