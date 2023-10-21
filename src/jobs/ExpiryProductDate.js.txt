import cron from 'node-cron';
import {
  productsServices,
  collectionServices,
  userServices,
} from '../services';
import { sendEmailReset, configEmail, notificationTemplates } from '../helpers';

const ExpiredProduct = async () => {
  cron.schedule(`${process.env.PRODUCT_CRON_SCHEDULE}`, async () => {
    try {
      const expiredProduct = await productsServices.expiredProductDate();
      if (expiredProduct.length) {
        await Promise.all([
          productsServices.updateProductStatus(expiredProduct),
        ]);
        const ExipedProductContent =
          notificationTemplates.ExipedProductTemplate();
        const users = expiredProduct.map(async (product) => {
          const coll = await collectionServices.getCollectionById(
            product.collectionId
          );
          return coll.userId;
        });
        const data = await Promise.all(users);
        const emails = data.map(async (user) => {
          const result = await userServices.getUserById(user);
          return result.email;
        });
        const useremails = await Promise.all(emails);
        const emailList = useremails.map((user) => user).join(', ');
        sendEmailReset(
          configEmail({
            email: emailList,
            subject: 'expired product',
            content: ExipedProductContent,
          })
        );
      }
    } catch (error) {
      const err = notificationTemplates.AdminErrorTemplate();
      sendEmailReset(
        configEmail({
          email: process.env.ADMIN_EMAIL,
          subject: 'Product error',
          content: err,
        })
      );
    }
  });
};

export default ExpiredProduct;
