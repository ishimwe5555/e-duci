import cron from 'node-cron';
import { userServices } from '../services';
import sendNotices from './sendExpiredPasswordemail';

const checkExpiredPassword = async () => {
  cron.schedule(`${process.env.CRON_SCHEDULE}`, async () => {
    try {
      const expiredPasswords =
        await userServices.findUsersWithExpiredPassword();
      if (expiredPasswords) {
        await Promise.all([
          userServices
            .updateUsersStatusWhoNeedsPasswordReset(expiredPasswords)
            .then(() => {
              sendNotices.sendPasswordChangePromptEmail(expiredPasswords);
            }),
        ]);
      }
    } catch (error) {
      throw new Error(error);
    }
  });
};

export default checkExpiredPassword;
