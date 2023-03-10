import nodemailer from 'nodemailer';

export default async function contactUs(req, res) {
  if (req.method === 'POST') {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILGUN_HOST,
      port: process.env.MAILGUN_PORT,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_KEY,
      },
    });
    const body = JSON.parse(req.body);
    transporter.sendMail(
      {
        from: body.from,
        to: process.env.CONTACT_EMAIL,
        subject: body.subject,
        text: body.text,
      },
      function (err, info) {
        if (err) {
          res.status(500).json({ success: false, err: err.message });
        } else {
          res.status(200).json({ success: true });
        }
      },
    );
  }
}
