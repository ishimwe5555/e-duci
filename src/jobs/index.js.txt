import checkPassword from './checkExpiredPassword';
import ExpiredProduct from './ExpiryProductDate';

const CroneJobs = () => {
  checkPassword();
};

const cron = () => {
  ExpiredProduct();
};

export default { CroneJobs, cron };
