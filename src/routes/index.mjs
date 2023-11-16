import express from 'express';
//import userRoutes from './user.route.mjs';
import productRoutes from './product.route.mjs';
//import userwithGoogleRoutes from './user_with_google.route.js';
//import roleRoutes from './role.route.js';
//import wishlistRoutes from './wishlist.route.js';
//import reviewRoutes from './review.route.js';
//import cartRoutes from './cart.route.js';
// import checkoutRoutes from './checkout.route.js';
// import orderRoutes from './order.route.js';
//import notificationRoutes from './notification.route.js';
// import paymentRouter from './payment.route.js';
//import chatsRoutes from './chats.route.js';
import categoryRoutes from './categories.route.mjs';

const router = express.Router();
//router.use('/', userwithGoogleRoutes);
//router.use('/users', userRoutes, roleRoutes);
router.use('/products', productRoutes);
//router.use('/wishlist', wishlistRoutes);
//router.use('/reviews', reviewRoutes);
//router.use('/cart', cartRoutes);
// router.use('/', checkoutRoutes);
// router.use('/orders', orderRoutes);
//router.use('/notifications', notificationRoutes);
// router.use('/checkout', paymentRouter);
//router.use('/chat', chatsRoutes);
router.use('/categories', categoryRoutes);

router.use('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Not Found',
  });
});

export default router;
