const { Router } = require('express')
const passport = require('passport')
const router = Router()
// const UsuarioController = require('../controllers/UsuarioController')
const jwt = require('jsonwebtoken')
const roles = require('../middlewares/roles')
const authUtil = require('../utils/validators/auth/authUtil')
const { InvalidCredentials } = require('../errors')
require('../middlewares/auth')

router.post(
  '/auth/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    return res
      .status(200)
      .send({ message: 'Signup Successful', user: req.user })
  }
)

router.post('/auth/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        // 401 (Not Authorized)
        const error = new InvalidCredentials(JSON.stringify(info))

        return next(error)
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error)
        }
        const body = {
          id: user.id,
          email: user.email,
          is_admin: user.is_admin
        }
        // env var
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRATION
        })
        return res.status(200).json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get(
  '/auth/jwt/verify',
  [passport.authenticate('jwt', { session: false }), roles],
  (req, res, next) => {
    try {
      res.status(200).json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.headers.authorization
      })
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/auth/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
    prompt: 'select_account',
    accessType: 'offline'
  })
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res, next) => {
    authUtil.signJWT(req, res)
  }
)

router.get(
  '/auth/google/verify',
  [passport.authenticate('jwt', { session: false }), roles],
  (req, res, next) => {
    try {
      res.status(200).json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.headers.authorization
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
