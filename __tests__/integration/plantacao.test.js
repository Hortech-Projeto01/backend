const expectExport = require('expect')
const { SoloService, PlantacaoService, PlantaService } = require('../../services')
const truncate = require('../utils/truncate')
const soloService = new SoloService()
const plantacaoService = new PlantacaoService()
const plantaService = new PlantaService()

const soloModel = {
  nivel_ph: 6.0,
  tipo_solo: 'TIPOB',
  temperatura: 39.6,
  tipo_vaso: 'TIPOA'
}

const soloModel2 = {
  nivel_ph: 7.0,
  tipo_solo: 'TIPOA',
  temperatura: 38.9,
  tipo_vaso: 'TIPOB'
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
  it('should create plantacao', async () => {
    const solo = await soloService.create(soloModel)
    const id = solo.id
    const plantacaoModel = {
      solo_id: solo.id
    }
    const plantacao = await plantacaoService.create(plantacaoModel, id)
    expectExport(plantacao.solo_id).toBe(solo.id)
  })
  it('should find one plantacao and delete one plantacao', async () => {
    const solo = await soloService.create(soloModel)
    const id = solo.id
    const plantacaoModel = {
      solo_id: solo.id
    }
    const plantacao = await plantacaoService.create(plantacaoModel, id)

    expect(await plantacaoService.findById(plantacao.id)).toBeDefined()

    await plantacaoService.delete(plantacao.id)

    expect(async () => await plantacaoService.findById(plantacao.id)).rejects.toThrow('Recurso Plantacao nao encontrado')
  })
  it('should find all plantacoes', async () => {
    const solo = await soloService.create(soloModel)
    const id = solo.id
    const plantacaoModel = {
      solo_id: solo.id
    }
    const plantacaoModel2 = {
      solo_id: solo.id
    }
    await plantacaoService.create(plantacaoModel, id)
    await plantacaoService.create(plantacaoModel2, id)
    const plantacoes = await plantacaoService.findAll()

    expect(plantacoes.rows.length).toEqual(2)
  })
  it('should update plantacao', async () => {
    const solo = await soloService.create(soloModel)
    const solo2 = await soloService.create(soloModel2)
    const id = solo.id
    const plantacaoModel = {
      solo_id: solo.id
    }
    const plantacao = await plantacaoService.create(plantacaoModel, id)
    const result = await plantacaoService.update({
      solo_id: solo2.id
    }, plantacao.id)

    expect(result).toEqual([1])
  })
  it('should get planta in plantacao', async () => {
    const planta = await plantaService.create(plantaModel)
    const solo = await soloService.create(soloModel)
    const id = solo.id
    const plantacaoModel = {
      solo_id: solo.id
    }
    const plantacao = await plantacaoService.create(plantacaoModel, id)
    await plantacaoService.addPlanta(planta.id, plantacao.id)
    const plantaFound = await plantacaoService.getPlanta(planta.id, plantacao.id)

    expect(plantaFound.length).toEqual(1)
  })
  it('should get plantas in plantacao and delete planta', async () => {
    const planta = await plantaService.create(plantaModel)
    const planta2 = await plantaService.create(plantaModel2)
    const solo = await soloService.create(soloModel)
    const id = solo.id
    const plantacaoModel = {
      solo_id: solo.id
    }
    const plantacao = await plantacaoService.create(plantacaoModel, id)
    await plantacaoService.addPlanta(planta.id, plantacao.id)
    await plantacaoService.addPlanta(planta2.id, plantacao.id)
    const plantas1 = await plantacaoService.getPlantas(plantacao.id)

    expect(plantas1.length).toEqual(2)

    await plantacaoService.deletePlanta(planta.id, plantacao.id)

    const plantas2 = await plantacaoService.getPlantas(plantacao.id)

    expect(plantas2.length).toEqual(1)
  })
  it('should find by id plantacao', async () => {
    const solo = await soloService.create(soloModel)
    const id = solo.id
    const plantacaoModel = {
      solo_id: solo.id
    }
    const plantacao = await plantacaoService.create(plantacaoModel, id)
    const plantacaoFound = await plantacaoService.findById(plantacao.id)

    expect(plantacaoFound.id).toBe(plantacao.id)
  })
})
