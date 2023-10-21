function configEmail({ email, subject, content } = {}) {
  return {
    from: process.env.NODE_MAILER_USER,
    to: `${email}`,
    subject: `${subject}`,
    html: `${content}`,
  };
}

export default configEmail;
