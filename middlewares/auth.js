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
      // env var
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

passport.use(
  new GoogleStrategy(
    {
      // env var
      clientID:
                '177616451190-epb3ae4emf3pbipinppc158johkksv1n.apps.googleusercontent.com',
      clientSecret: 'g9UssTwUd8yo8f6pAQFys_Fj',
      callbackURL: 'http://localhost:3001/auth/google/callback',
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
          is_admin: true,
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
