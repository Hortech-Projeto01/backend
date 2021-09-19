// const cron = require('node-cron')

exports.agendaHorario = {
  0: [
    {
      name: 'primeira',
      time: new Date().toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
      }),
      irrigated: false
    }
  ],
  1: [
    {
      name: 'primeira',
      time: null,
      irrigated: false
    }
  ],
  2: [
    {
      name: 'primeira',
      time: null,
      irrigated: false
    }
  ],
  3: [
    {
      name: 'primeira',
      time: null,
      irrigated: false
    }
  ],
  4: [
    {
      name: 'primeira',
      time: null,
      irrigated: false
    }
  ],
  5: [
    {
      name: 'primeira',
      time: new Date().toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
      }),
      irrigated: false
    }
  ],
  6: [
    {
      name: 'primeira',
      time: null,
      irrigated: false
    }
  ]
}

exports.changeIrrigated = (obj, day, name, irrigated) => {
  const irrigation = this.getOneIrrigation(obj, day, name)
  irrigation.irrigated = irrigated
  return obj
}
exports.getOneIrrigation = (obj, day, name) => {
  const irrigations = this.getAllIrrigationsFromADay(obj, day)
  let irrigation = {}
  irrigations.forEach((element) => {
    if (element.name === name) {
      irrigation = element
    }
  })
  return irrigation
}

exports.getAllIrrigationsFromADay = (obj, day) => {
  return obj[day]
}
exports.getDate = (obj, day, name) => {
  const irrigation = this.getOneIrrigation(obj, day, name)
  // eslint-disable-next-line eqeqeq
  if (Object.keys(irrigation) == 0) {
    return null
  }
  return irrigation.time
}

// cron.schedule('* * * * *', () => {
//   console.log('\x1b[33m%s\x1b[0m', 'tchururu')
// })

// console.log(this.getAllIrrigationsFromADay(this.agendaHorario, 5))
// console.log(this.getDate(this.agendaHorario, 5, 'primeira'))
// console.log(
//   this.changeIrrigated(
//     this.changeIrrigated(this.agendaHorario, 5, 'primeira', true),
//     1,
//     'primeira',
//     true
//   )
// )
// console.log('16:49:30' > '16:00:16')
