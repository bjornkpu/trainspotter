import config from './config'
import nodemailer from 'nodemailer'
import pug from 'pug'

export async function sendMail(pugVar:any = {}) {
  const htmlTemplate = pug.compileFile('src/mail.pug')
  const transporter = nodemailer.createTransport(config.mail)

  // send mail with defined transport object
  await transporter.sendMail({
    from: {
      name: 'Trainspotter',
      address: config.mail.auth.user
    }, // sender address
    replyTo: config.mail.auth.user,
    to: config.mail.auth.user, // list of receivers
    subject: `Trainspotter abnormality for ${pugVar.normalExpectedStartTime}`, // Subject line
    text: '', // plain text body
    html: htmlTemplate(pugVar), // html body
  })
}