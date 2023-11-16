import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { asyncWrapper } from '../helpers/index.mjs';
import {
//  checkPermission,
  //isAuthenticated,
  // isCollectionExists,
  isProductSeller,
  // isValidCollection,
  validate,
  validateParams,
  checkImg,
} from '../middleware/index.mjs';
import { productControllers, productImageController } from '../controllers/index.mjs';
import { productSchema, uuidSchemas } from '../utils/index.mjs';
import { UploadImages, UploadCsv } from '../helpers/multer.mjs';

const router = Router();

router.use(cookieParser());

router.get('/search', productControllers.searchProducts);

router.get('/all', asyncWrapper(productControllers.listAllItems));

router.get(
  '/list-items/:cid',
  validateParams(uuidSchemas.collectionIdSchema),
  //isAuthenticated,
  //checkPermission('SELLER'),
  // isValidCollection,
  asyncWrapper(productControllers.listItems)
);

router.get(
  '/:pid',
  validateParams(uuidSchemas.getProductSchema),
  asyncWrapper(productControllers.getSingleProduct)
);

router.delete(
  '/:cid/delete/:pid',
  //isAuthenticated,
  //checkPermission('SELLER'),
  validateParams(uuidSchemas.deleteProductSchema),
  // isValidCollection,
  asyncWrapper(productControllers.deleteProduct)
);

router.delete(
  '/:cid/delete',
  //isAuthenticated,
  //checkPermission('SELLER'),
  // isValidCollection,
  asyncWrapper(productControllers.DeleteCollection)
);

router.post('/', UploadImages, asyncWrapper(productControllers.addproduct));
router.post(
  '/import',
  UploadCsv,
  asyncWrapper(productControllers.importProducts)
);

router.patch(
  '/update/:id',
  UploadImages,
  validate(productSchema.updateproductSchema),
  // isAuthenticated,
  // checkPermission('SELLER'),
  isProductSeller,
  asyncWrapper(productControllers.updateOnadd)
);

router.patch(
  '/update/image/:id',
  UploadImages,
  validate(productSchema.addImage),
  // isAuthenticated,
  // checkPermission('SELLER'),
  // isProductSeller,
  checkImg,
  productImageController.updtImages
);
export default router;
