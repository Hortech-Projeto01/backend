const nodemailer = require('nodemailer')
const sendGrid = require('@sendgrid/mail')

exports.sendGridEmail = async (email) => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
  const info = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'Alert to irrigation',
    text: 'IRRIGATION',
    html: '<h2>IRRIGATION</h2>'
  }
  sendGrid
    .send(info)
    .then((msg) => console.log(`Email to ${email} was sent`))
    .catch(error => console.log(error.message))
}

exports.sendEmail = async (email) => {
  const transport = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASS_SENDER
    },
    service: 'gmail',
    secure: true
  })
  const info = {
    from: process.env.EMAIL_SENDER, // sender address
    to: email, // receiver (use array of string for a list)
    subject: 'Alert to irrigation', // Subject line
    html: '<p>IRRIGATION</p>' // plain text body
  }
  await transport.sendMail(info, (err, info) => {
    if (err) console.log(err)
    else console.log(info)
  })

  await transport.verify(function (error, success) {
    if (error) {
      console.log(error)
    } else {
      console.log('Server is ready to take our messages' + success)
    }
  })
}
