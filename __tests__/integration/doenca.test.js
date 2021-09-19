const expectExport = require('expect')
const { DoencaService } = require('../../services')
const truncate = require('../utils/truncate')
const doencaService = new DoencaService()

const doencaModel = {
  nome: 'Bolor Cinzento',
  transmissao: 'Ar',
  prevencao: 'afastar as plantas e não usar adubo em excesso',
  tratamento: 'agrotóxico'
}

const doencaModel2 = {
  nome: 'Fungo Ferrugem',
  transmissao: 'Esporos',
  prevencao: 'reduzir a humidade do ambiente',
  tratamento: 'remoção dos esporos'
}

describe('crud', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create doença', async () => {
    const doenca = await doencaService.create(doencaModel)
    expectExport(doenca.nome).toBe('Bolor Cinzento')
  })
  it('should find one doença and delete one doença', async () => {
    const doenca = await doencaService.create(doencaModel)
    console.log(doenca)
    expect(await doencaService.findById(doenca.id)).toBeDefined()

    await doencaService.delete(doenca.id)

    expect(async () => await doencaService.findById(doenca.id)).rejects.toThrow('Recurso Doenca nao encontrado')
  })
  it('should find all doencas', async () => {
    await doencaService.create(doencaModel)
    await doencaService.create(doencaModel2)
    const doencas = await doencaService.findAll()
    expect(doencas.rows.length).toEqual(2)
  })
  it('should update doenca', async () => {
    const doenca = await doencaService.create(doencaModel)
    const result = await doencaService.update({
      nome: 'Bolor Preto',
      transmissao: 'Ar',
      prevencao: 'afastar as plantas e não usar adubo em excesso',
      tratamento: 'agrotóxico'
    }, doenca.id)
    expect(result).toEqual([1])
  })
})
