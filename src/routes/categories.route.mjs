import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { asyncWrapper } from '../helpers/index.mjs';
import { categoryController } from '../controllers/index.mjs';
import asyncwrapper from '../helpers/asyncwrapper.mjs';

const router = Router();

router.use(cookieParser());

router.get('/', asyncwrapper(categoryController.getCategories));
router.get(
  '/s/:subcatId',
  asyncWrapper(categoryController.getSubsubcategories)
);
router.get('/:id', asyncwrapper(categoryController.getSubcategories));
router.get('/:name', asyncwrapper(categoryController.getSingleCategory));
router.get(
  '/:catId/:name',
  asyncWrapper(categoryController.getSingleSubcategory)
);
router.get(
  '/s/:subcatId/:name',
  asyncWrapper(categoryController.getSingleSubsubcategory)
);

router.post('/add', asyncwrapper(categoryController.addCategory));
router.post('/add/:catId', asyncwrapper(categoryController.addSubcategory));
router.post(
  '/s/add/:subcatId',
  asyncwrapper(categoryController.addSubsubcategory)
);

router.delete('/', asyncWrapper(categoryController.deleteAllCategories));

export default router;
