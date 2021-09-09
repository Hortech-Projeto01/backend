const { Router } = require('express')
const passport = require('passport')
const router = Router()
// const UsuarioController = require('../controllers/UsuarioController')
const jwt = require('jsonwebtoken')
const roles = require('../middlewares/roles')
require('../middlewares/auth')

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    return res.status(200).send({ message: 'Signup Successful', user: req.user })
  }
)

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            // 401 (Not Authorized)
            const error = new Error(JSON.stringify(info))

            return next(error)
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) {
                return next(error)
              }
              const body = { id: user.id, email: user.email, is_admin: user.is_admin }
              const token = jwt.sign({ user: body }, 'Any', { expiresIn: '5m' })
              return res.status(200).json({ token })
            }
          )
        } catch (error) {
          return next(error)
        }
      }
    )(req, res, next)
  }
)

router.get('/authProtected', [passport.authenticate('jwt', { session: false }), roles], (req, res, next) => {
  try {
    res.status(200).json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.headers.authorization
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
