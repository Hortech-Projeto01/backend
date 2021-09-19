const passport = require('passport')
const Local = require('passport-local').Strategy
const db = require('../models')
const bcrypt = require('bcrypt')
const JWTstr = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const GoogleStrategy = require('passport-google-oauth2').Strategy

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
      // lembrar de mudar para false
      req.body.is_admin = false
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
        const user = await db.Usuario.findOne({
          where: { email: email }
        })
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
      secretOrKey: process.env.JWT_SECRET,
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

passport.use(
  new GoogleStrategy(
    {
      // env var
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://${process.env.GOOGLE_CALLBACK_HOST}/auth/google/callback`,
      passReqToCallback: true
    },
    async function (request, accessToken, refreshToken, profile, next) {
      const email = profile.emails[0].value

      const currentUser = await db.Usuario.findOne({
        where: { googleId: profile.id }
      })

      if (currentUser) {
        return next(null, currentUser)
      } else {
        const newUser = {
          senha: profile.id,
          googleId: profile.id,
          email: email,
          is_admin: false,
          nome: profile.name.givenName + ' ' + profile.name.familyName
        }

        const userCreated = await db.Usuario.create(newUser)
        return next(null, userCreated)
      }
    }
  )
)

async function isValidPassword (usuario, password) {
  const compare = await bcrypt.compare(password, usuario.senha)
  return compare
}
