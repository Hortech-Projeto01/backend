'use strict'
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Usuario.hasMany(models.Plantacao, {
        foreignKey: 'usuario_id'
      })
    }
  };
  Usuario.init({
    email: DataTypes.STRING,
    nome: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
    freezeTableName: true
  })

  Usuario.beforeCreate((usuario, _) => {
    // eslint-disable-next-line no-return-assign
    return usuario.id = uuid.v4()
  })

  Usuario.beforeCreate((usuario, options) => {
    return bcrypt.hash(usuario.senha, 10)
      .then(hash => {
        usuario.senha = hash
      })
      .catch(err => {
        throw new Error(err)
      })
  })

  return Usuario
}
