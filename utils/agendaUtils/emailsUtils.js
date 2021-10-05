const nodemailer = require('nodemailer')
const sendGrid = require('@sendgrid/mail')

let htmlContent =`
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <style>
        table, td, div, h1, p {font-family: Arial, sans-serif;}
    </style>
</head>
<body style="margin:0;padding:0;">
    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
            <td align="center" style="padding:0;">
                <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                    <tr>
                        <td align="center" style="padding:40px 0 30px 0;background:#46ee04;">
                            <img src="https://i.ibb.co/yYgXFYk/Logo.png" alt="" width="150" style="height:auto;display:block;" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:36px 30px 42px 30px;">
                            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                <tr>
                                    <td style="padding:0 0 36px 0;color:#153643;">
                                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Aviso de Irrigação</h1>
                                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;align:”Justify”">
                                            Olá, fique atento ao clima, em caso de chuva, dispense a irrigação por hoje. De preferênica
                                            aos horários do início da amanhã e do fim da tarde. Use água em abundancia, mas cuidado com 
                                            desperdícios e encharcamentos, pois pode ocasionar doenças e aparecimento de fungos.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0;">
                                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                            <tr>
                                                <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                                                    <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://i.ibb.co/rHCWwwY/milho.png" alt="" width="260" style="height:auto;display:block;" /></p>
                                                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                                        Para a irrigação do milho verde, atente sempre ao solo, o mesmo tem que ser úmido,
                                                        mas evite o excesso.O milho exige bastante água, utilize uma lámina de 5mm de água 
                                                        por dia, e evite a irrigação em dias com muito vento, pois o vento faz as culturas 
                                                        absorverem menos água, resultado em desperdício.
                                                    </p>
                                                </td>
                                                <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                                                <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                                                    <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://i.ibb.co/6DKxZBY/feij-o.png" alt="" width="260" style="height:205;display:block;" /></p>
                                                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                                        Para irrigação do feijão, fique atento ao clima e condições ambientais, na fase 
                                                        de germinação utilize uma lâmina de água de 1,3mm, aumentando para 3,6mm nas demais
                                                        fases. Utilização de gotejamento ou microaspressão pode ajudar no processo de umidificação
                                                        do solo.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:30px;background:#46ee04;">
                            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                                <tr>
                                    <td style="padding:0;width:50%;" align="left">
                                        <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                                            &reg; Projeto 01 - 2020.2, Hortech 2021<br/>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

exports.sendGridEmail = async (email) => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
  const info = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'Alert to irrigation',
    text: 'IRRIGATION',
    html: htmlContent,
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
    html: htmlContent // plain text body
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
