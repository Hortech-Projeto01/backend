/* eslint-disable eqeqeq */
const NotFound = require('../errors/NotFound')
const database = require('../models')
const { soloValidator, usuarioValidator, plantaValidator, doencaValidator } = require('../utils/validators')

class Services {
  constructor (nomeModelo) {
    this.nomeModelo = nomeModelo
  }

  async findAll (size = 5, page = 0) {
    const parsedSize = parseInt(size)
    const parsedPage = parseInt(page)
    if (isNaN(parsedSize) || isNaN(parsedPage)) {
      throw new NotFound(this.nomeModelo)
    }
    const allObjects = await database[this.nomeModelo].findAndCountAll({
      limit: parsedSize,
      offset: parsedPage * parsedSize,
      order: [['updatedAt', 'DESC']]
    })
    allObjects.currentPage = parsedPage + 1
    return allObjects
  }

  async findById (id) {
    const entity = await database[this.nomeModelo].findOne({
      where: {
        id
      }
    })
    if (!entity) {
      throw new NotFound(this.nomeModelo)
    }
    return entity
  }

  async create (data) {
    switch (this.nomeModelo) {
      case 'Solo':
        soloValidator(data)
        break
      case 'Doenca':
        doencaValidator(data)
        break
      case 'Planta':
        plantaValidator(data)
        break
      case 'Usuario':
        usuarioValidator(data)
        break
      default:
        break
    }

    return database[this.nomeModelo].create(data)
  }

  async update (data, id, transacao = {}) {
    switch (this.nomeModelo) {
      case 'Solo':
        soloValidator(data)
        break
      case 'Doenca':
        doencaValidator(data)
        break
      case 'Planta':
        plantaValidator(data)
        break
      case 'Usuario':
        usuarioValidator(data)
        break
      default:
        break
    }

    const count = await database[this.nomeModelo].update(data, { where: { id } }, transacao)

    // eslint-disable-next-line eqeqeq
    if (count == 0) {
      throw new NotFound(this.nomeModelo)
    }
    return count
  }

  async delete (id) {
    const count = await database[this.nomeModelo].destroy({
      where: {
        id
      }
    })

    // eslint-disable-next-line eqeqeq
    if (count == 0) {
      throw new NotFound(this.nomeModelo)
    }
    return count
  }
}

module.exports = Services
