const database = require('../../models')

describe('crud', () => {
  it('should create planta', async () => {
    const planta = await database.Planta.create({
      nome: 'plantinha',
      especie: 'espec',
      tecnicas_plantio: 'Semeadura',
      infos_por_estacao: 'Verão',
      cor_folhas: 'Verde',
      num_frutos_colhidos: 10,
      qtd_diaria_agua: 2.5,
      qtd_media_sementes: 30,
      nivel_incidencia_solar: 5.5
    })

    expect(planta.nome).toBe('plantinha')
  })
})
