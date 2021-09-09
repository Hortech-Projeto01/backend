module.exports = function (req, res, next) {
  // lembrar de colocar !
  if (!req.user.is_admin) return res.status(403).send('Access denied.')
  next()
}
