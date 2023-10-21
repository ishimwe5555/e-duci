// eslint-disable-next-line import/no-cycle
import { emailServices } from '../services';

const sendEmailReset = (mailConfigurations) => {
  emailServices({
    email: mailConfigurations.to,
    subject: mailConfigurations.subject,
    content: mailConfigurations.html,
  });
  return true;
};

export default sendEmailReset;
