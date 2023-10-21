import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { reviewControllers } from '../controllers';
import { isAuthenticated, validate } from '../middleware';
import { reviewSchema } from '../utils';
import { asyncWrapper } from '../helpers';

const router = Router();

router.use(cookieParser());

router.get('/:pid', asyncWrapper(reviewControllers.getReviews));
router.get('/rating/:pid', asyncWrapper(reviewControllers.averageRating));

router.post(
  '/:pid',
  isAuthenticated,
  validate(reviewSchema),
  asyncWrapper(reviewControllers.addReview)
);

router.delete(
  '/:rid',
  isAuthenticated,
  asyncWrapper(reviewControllers.removeReview)
);

export default router;
