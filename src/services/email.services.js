import nodemailer from 'nodemailer';

async function sendEmail({ email, subject, content }) {
  const mail = nodemailer.createTransport({
    host: process.env.HOST_MAILER,
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
  });
  const data = {
    from: process.env.NODE_MAILER_USER,
    to: email,
    subject,
    html: content,
  };
  mail.sendMail(data);
}

export default sendEmail;
