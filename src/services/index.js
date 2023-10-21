/* eslint-disable import/no-cycle */
// import collectionServices from './collection.service';
import userServices from './user.services';
import emailServices from './email.services';
import productsServices from './products.service';
// import checkoutServices from './checkout.service';
import twoFactorAuth from './twofactor.service';
// import wishListServices from './wishlist.services';
import reviewsServices from './reviews.service';
import cartServices from './cart.services';
import notificationServices from './notification.services';
import readNotificationService from './read_notification.service';
import userProfileServices from './userProfile.service';
// import orderServices from './order.service';
import chatServices from './chat.service';
import categoryServices from './categories.service';
import vendorServices from './vendor.service';

export {
  userServices,
  emailServices,
  productsServices,
  cartServices,
  twoFactorAuth,
  reviewsServices,
  notificationServices,
  readNotificationService,
  userProfileServices,
  chatServices,
  categoryServices,
  vendorServices,
};
