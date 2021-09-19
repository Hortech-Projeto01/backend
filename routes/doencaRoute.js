const { Router } = require('express')
const DoencaController = require('../controllers/DoencaController')

const router = Router()
const passport = require('passport')
const roles = require('../middlewares/roles')
require('../middlewares/auth')

router.get('/doencas/:id',
  [passport.authenticate('jwt', { session: false })],
  DoencaController.findById)
router.delete('/doencas/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  DoencaController.delete)
router.get('/doencas/plantas/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  DoencaController.getPlantasFromDoenca)
router.post('/doencas',
  [passport.authenticate('jwt', { session: false }), roles],
  DoencaController.insert)
router.get('/doencas',
  [passport.authenticate('jwt', { session: false })],
  DoencaController.findAll)
router.put('/doencas/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  DoencaController.update)
module.exports = router
