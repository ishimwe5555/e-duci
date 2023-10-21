/* eslint-disable import/no-cycle */
import { notificationTemplates, sendEmailReset, configEmail } from '../helpers';

async function signup(userData) {
  // Send notification email
  const signupContent = notificationTemplates.signupTemplate(userData.username);
  sendEmailReset(
    configEmail({
      email: userData.email,
      subject: 'Team Sostene User Registration',
      content: signupContent,
    })
  );
}

async function changePassword(userData) {
  // Send notification email
  const changePasswordContent = notificationTemplates.changePasswordTemplate(
    userData.username
  );
  sendEmailReset(
    configEmail({
      email: userData.email,
      subject: 'Team Sostene Change Password',
      content: changePasswordContent,
    })
  );
}

export default {
  signup,
  changePassword,
};
