const passport = require('passport')
const Local = require('passport-local').Strategy
const db = require('../models')
const bcrypt = require('bcrypt')
const JWTstr = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
  'signup',
  new Local(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false,
      passReqToCallback: true
    },
    async (req, username, password, next) => {
      req.body.is_admin = true
      try {
        const usuario = await db.Usuario.create(req.body)
        return next(null, usuario)
      } catch (error) {
        return next(error)
      }
    }
  )
)

passport.use(
  'login',
  new Local(
    {
      usernameField: 'email',
      passwordField: 'senha'
    },
    async (email, senha, next) => {
      try {
        const user = await db.Usuario.findOne({ where: { email: email } })
        if (!user) {
          return next(null, false, { message: 'User Not Found' })
        }
        const validate = isValidPassword(user, senha)
        if (!validate) {
          return next(null, false, { message: 'Wrong Password' })
        }
        return next(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        return next(error)
      }
    }
  )
)

passport.use(
  new JWTstr(
    {
      secretOrKey: 'Any',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, next) => {
      try {
        return next(null, token.user)
      } catch (error) {
        next(error)
      }
    }
  )
)

async function isValidPassword (usuario, password) {
  const compare = await bcrypt.compare(password, usuario.senha)
  return compare
}
