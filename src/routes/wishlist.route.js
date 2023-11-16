import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { isAuthenticated } from '../middleware';
import { wishesController } from '../controllers/index.mjs';

const router = Router();

router.use(cookieParser());

router.post(
  '/products/add/:pid',
  isAuthenticated,
  wishesController.addToWishlist
);
router.get('/all', isAuthenticated, wishesController.getWishList);
router.delete(
  '/products/delete/:pid',
  isAuthenticated,
  wishesController.removeFromWishlist
);
export default router;
