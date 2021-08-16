const validator = require('validator')
const { InvalidInput } = require('../../errors')

const schema = {
    nome: value => validator.isAlpha(value,'pt-BR', {ignore: ' '}) ,
    especie: value => validator.isAlpha(value,'pt-BR', {ignore: ' '}),
    tecnicas_plantio: value => validator.isAlpha(value,'pt-BR', {ignore: ' '}),
    infos_por_estacao: value => validator.isAlpha(value,'pt-BR', {ignore: ' '}),
    cor_folhas: value => validator.isAlpha(value,'pt-BR', {ignore: ' '}),
    num_frutos_colhidos: value => validator.isInt(value),
    qtd_diaria_agua: value => validator.isFloat(value),
    qtd_media_sementes: value => validator.isInt(value),
    nivel_incidencia_solar: value => validator.isFloat(value)
}

const matchSchema = (object) => Object
  .keys(schema)
  .filter(key => {
    if (!object[key]) {
      return false
    }
    return !schema[key](object[key] + '')
  })
  .map(key => key)

const validate = (object) => {
    const errors = matchSchema(object)
    const examples = {
            nome: "Milho",
            especie: "True",
            tecnicas_plantio: "Semeadura",
            infos_por_estacao: "Inverno",
            cor_folhas: "Amarela",
            num_frutos_colhidos: 15,
            qtd_diaria_agua: 2.5,
            qtd_media_sementes: 30,
            nivel_incidencia_solar: 5.5
    }
    const objError = {}
    objError.errors = errors
    objError.example = examples

    if (errors.length > 0) {
        throw new InvalidInput(JSON.stringify(objError))
    }
}

module.exports = validate