/* eslint-disable eqeqeq */
const UsuarioService = require('../services/usuarioService')
const usuarioService = new UsuarioService()

class UsuarioController {
  // static async signup (req, res, next) {
  //   return res.status(200).send({ message: 'Signup Successful', user: req.user })
  // }

  static async signup (req, res, next) {
    const user = req.body
    try {
      const newUser = await usuarioService.create(user)
      return res.status(201).send(newUser)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UsuarioController
