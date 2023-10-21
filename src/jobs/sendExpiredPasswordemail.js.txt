import { notificationTemplates, sendEmailReset } from '../helpers';

const sendPasswordChangePromptEmail = (users) => {
  const emailList = users.map((user) => user.email).join(', ');
  const mailBody = {
    email: emailList,
    subject: 'expired password',
    html: `${notificationTemplates.sendExpiredPasswordMailTemplate()}`,
  };
  sendEmailReset(mailBody);
};

export default { sendPasswordChangePromptEmail };
