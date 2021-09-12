const expectExport = require('expect')
const { DoencaService, PlantaService } = require('../../services')
const truncate = require('../utils/truncate')
const doencaService = new DoencaService()
const plantaService = new PlantaService()

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

const plantaModel = {
  nome: 'plantinha',
  especie: 'espec',
  tecnicas_plantio: 'Semeadura',
  infos_por_estacao: 'Verão',
  cor_folhas: 'Verde',
  num_frutos_colhidos: 10,
  qtd_diaria_agua: 2.5,
  qtd_media_sementes: 30,
  nivel_incidencia_solar: 5.5
}

const plantaModel2 = {
  nome: 'plantao',
  especie: 'espec',
  tecnicas_plantio: 'Semeadura',
  infos_por_estacao: 'Verão',
  cor_folhas: 'Verde',
  num_frutos_colhidos: 10,
  qtd_diaria_agua: 2.5,
  qtd_media_sementes: 30,
  nivel_incidencia_solar: 5.5
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
  it('should get plantas in doenca', async () => {
    const planta = await plantaService.create(plantaModel)
    const planta2 = await plantaService.create(plantaModel2)
    const doenca = await doencaService.create(doencaModel)
    await plantaService.addDoenca(planta.id, doenca.id)
    await plantaService.addDoenca(planta2.id, doenca.id)
    const plantas = await doencaService.getPlantas(doenca.id)

    expect(plantas.length).toEqual(2)
  })
})
