const { Router } = require('express')
const SoloController = require('../controllers/SoloController')

const router = Router()
const passport = require('passport')
const roles = require('../middlewares/roles')
require('../middlewares/auth')

router.put('/solos/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  SoloController.update)
router.get('/solos/:id',
  [passport.authenticate('jwt', { session: false })],
  SoloController.findById)
router.post('/solos',
  [passport.authenticate('jwt', { session: false }), roles],
  SoloController.insert)
router.delete('/solos/:id',
  [passport.authenticate('jwt', { session: false }), roles],
  SoloController.delete)
router.get('/solos',
  [passport.authenticate('jwt', { session: false })],
  SoloController.findAll)

module.exports = router
