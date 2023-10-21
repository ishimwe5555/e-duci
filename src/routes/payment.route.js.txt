import express, { Router } from 'express';
import paymentController from '../controllers/payment.controller';
import { addPaymentSchema } from '../utils';
import {
  validate,
  isAuthenticated,
  checkOrderExists,
  checkPermission,
  madePayment,
} from '../middleware';
import { asyncWrapper } from '../helpers';

const router = Router();

router.post(
  '/payment/:orderId',
  isAuthenticated,
  checkPermission('BUYER'),
  checkOrderExists,
  madePayment,
  validate(addPaymentSchema),
  asyncWrapper(paymentController.makePayment)
);
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.webhook
);
router.get('/redirect', asyncWrapper(paymentController.redirect));
export default router;
