import nodemailer from 'nodemailer'

export default async function sendMail({ query: { message } }, res) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 2525,
    auth: {
      user: 'postmaster@mail.forbole.com',
      pass: 'fe6e6eb96a45803e32a84ed0687647f5-c485922e-9aea135b',
    },
  })

  // const messageTest = {
  //   from: 'from-example@email.com',
  //   to: 'soft8520@gmail.com',
  //   subject: 'Subject',
  //   text: 'Hello SMTP Email',
  // }

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log('err', err)
    } else {
      console.log('info', info)
    }
  })
}
