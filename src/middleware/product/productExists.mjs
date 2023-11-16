import {  productsServices } from '../../services/index.mjs';

const isProductSeller = async (req, res, next) => {
  const product = await productsServices.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({
      code: '404',
      message: 'Failed',
      error: 'Product not found !!!',
    });
  }
  const collection = await collectionServices.getCollectionById(
    product.collectionId
  );
  if (req.user.id !== collection.userId) {
    return res.status(401).json({ code: 401, message: 'Unauthorized seller' });
  }
  req.prodImages = await product.getProductImages();
  return next();
};

export default isProductSeller;
