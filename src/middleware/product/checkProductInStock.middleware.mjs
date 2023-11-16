import { productsServices } from '../../services/index.mjs';

const checkProductInStock = async (req, res, next) => {
  const cart = await cartServices.getCart(req.user.id);
  const productsInCart = cart.products;
  if (productsInCart.length === 0) {
    return res.status(406).json({
      code: 406,
      message: 'Your cart is empty!',
    });
  }
  const allProductsAvailable = await Promise.all(
    productsInCart.map(async (product) => {
      const availablePdt = await productsServices.getProductById(
        product.product.id
      );
      return availablePdt.quantity >= product.quantity;
    })
  );

  if (!allProductsAvailable.every(Boolean)) {
    const unavailableProducts = productsInCart.filter(
      (index) => !allProductsAvailable[index]
    );

    return res.status(200).json({
      code: 200,
      message: `These product are less stock!`,
      unavailableProducts,
    });
  }

  req.productsInCart = cart;
  return next();
};

export default checkProductInStock;
