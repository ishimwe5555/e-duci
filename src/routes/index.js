import express from 'express';
import userRoutes from './user.route';
import productRoutes from './product.route';
import userwithGoogleRoutes from './user_with_google.route';
import roleRoutes from './role.route';
import wishlistRoutes from './wishlist.route';
import reviewRoutes from './review.route';
import cartRoutes from './cart.route';
// import checkoutRoutes from './checkout.route';
// import orderRoutes from './order.route';
import notificationRoutes from './notification.route';
// import paymentRouter from './payment.route';
import chatsRoutes from './chats.route';
import categoryRoutes from './categories.route';

const router = express.Router();
router.use('/', userwithGoogleRoutes);
router.use('/users', userRoutes, roleRoutes);
router.use('/products', productRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/reviews', reviewRoutes);
router.use('/cart', cartRoutes);
// router.use('/', checkoutRoutes);
// router.use('/orders', orderRoutes);
router.use('/notifications', notificationRoutes);
// router.use('/checkout', paymentRouter);
router.use('/chat', chatsRoutes);
router.use('/categories', categoryRoutes);

router.use('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Not Found',
  });
});

export default router;
