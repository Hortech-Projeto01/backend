const jwt = require('jsonwebtoken')

exports.signJWT = (req, res) => {
  const body = {
    id: req.user.id,
    email: req.user.email,
    is_admin: req.user.is_admin
  }
  // env var
  jwt.sign({ user: body }, 'Any', {
    expiresIn: '5m'
  }, (err, token) => {
    if (err) {
      return res.status(500).send({ message: 'an error occurred during token signing' })
    } else {
      console.log(token)
      return res.status(200).json({ token })
    }
  })
}
