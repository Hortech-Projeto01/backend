const { PlantaService, DoencaService } = require('../../services')
const truncate = require('../utils/truncate')
const plantaService = new PlantaService()
const doencaService = new DoencaService()

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
const doencaModel = {
  nome: 'testando',
  transmissao: 'asdfasd',
  prevencao: 'asdfsadff',
  tratamento: 'usar adubo especifico'
}

describe('crud', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create planta', async () => {
    const planta = await plantaService.create(plantaModel)

    expect(planta.nome).toBe('plantinha')
  })
  it('should find one planta and delete one planta', async () => {
    const planta = await plantaService.create(plantaModel)

    expect(await plantaService.findById(planta.id)).toBeDefined()

    await plantaService.delete(planta.id)

    expect(async () => await plantaService.findById(planta.id)).rejects.toThrow('Recurso Planta nao encontrado')
  })
  it('should find all plantas', async () => {
    await plantaService.create(plantaModel)
    const plantas = await plantaService.findAll()
    expect(plantas.rows.length).toEqual(1)
  })
  it('should update planta', async () => {
    const planta = await plantaService.create(plantaModel)
    const result = await plantaService.update({
      nome: 'plantona',
      especie: 'espec',
      tecnicas_plantio: 'Semeadura',
      infos_por_estacao: 'Verão',
      cor_folhas: 'Verde',
      num_frutos_colhidos: 10,
      qtd_diaria_agua: 2.5,
      qtd_media_sementes: 30,
      nivel_incidencia_solar: 5.5
    }, planta.id)
    expect(result).toEqual([1])
  })
  it('should add doenca in planta, get and delete doenca', async () => {
    const planta = await plantaService.create(plantaModel)
    const doenca = await doencaService.create(doencaModel)
    await plantaService.addDoenca(planta.id, doenca.id)
    let doencas = await plantaService.getDoencas(planta.id)
    const doencaByPlanta = await plantaService.getDoenca(doenca.id, planta.id)

    expect(doencas.length).toEqual(1)
    expect(doencaByPlanta.nome).toBe('testando')

    await plantaService.deleteDoenca(doenca.id, planta.id)
    doencas = await plantaService.getDoencas(planta.id)
    expect(doencas.length).toEqual(0)

    await expect(async () => await plantaService.getDoenca(doenca.id, planta.id)).rejects.toThrow('Recurso PlantaDoenca nao encontrado')
  })
})
