
class UsuarioController {
  static async signup (req, res, next) {
    return res.status(200).send({ message: 'Signup Successful', user: req.user })
  }
}

module.exports = UsuarioController
