const Services = require('./Services')
const database = require('../models')
const NotFound = require('../errors/NotFound')

class UsuarioService extends Services {
  constructor () {
    super('Usuario')
    this.plantas = new Services('Planta')
    this.solo = new Services('Solo')
    this.agenda = new Services('Plantacao')
  }

  async findAllPlantacoes (userId, size = 5, page = 0) {
    const parsedSize = parseInt(size)
    const parsedPage = parseInt(page)

    if (isNaN(parsedSize) || isNaN(parsedPage)) {
      throw new NotFound(this.nomeModelo)
    }
    const allObjects = await database.Plantacao.findAndCountAll({
      where: {
        usuario_id: userId
      },
      limit: parsedSize,
      offset: parsedPage * parsedSize,
      order: [['updatedAt', 'DESC']]
    })
    allObjects.currentPage = parsedPage + 1
    return allObjects
  }
}

module.exports = UsuarioService
