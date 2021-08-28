const database = require('../../models')

module.exports = () => {
  return Promise.all(Object.keys(database.sequelize.models).map(key => {
    return database.sequelize.models[key].destroy({ truncate: true, force: true })
  }))
}
