import { cartServices } from '../services';

const addToCart = (req, res) => {
  const { pid } = req.params;
  const cartDetails = {
    productId: pid,
    quantity: 1,
  };
  cartServices
    .addToCart(req.user.id, cartDetails)
    .then((data) => {
      cartServices.displayCart(data).then((result) => {
        res.status(201).json({ code: 201, message: 'Added To Cart.', result });
      });
    })
    .catch((error) =>
      res
        .status(404)
        .json({ code: 404, message: 'product not found', error: error.message })
    );
};

const viewCartItems = async (req, res) => {
  const userId = req.user.id;
  const data = await cartServices.getCart(userId);
  return res.status(200).json({ code: 200, message: 'Cart Fetched', data });
};

const clearCartItems = async (req, res) => {
  const userId = req.user.id;
  const data = await cartServices.clearCart(userId);
  return res.status(200).json({ code: 200, message: 'Cart cleared', data });
};

const addQuantity = (req, res) => {
  const { pid } = req.params;
  const { quantity } = req.query;
  cartServices
    .addProductQuantity(req.user.id, pid, parseInt(quantity, 10))
    .then((data) =>
      cartServices.displayCart(data).then((result) => {
        res.status(200).json({ code: 200, message: 'Added Quantity.', result });
      })
    )
    .catch((error) => {
      res.status(406).json({ code: 406, message: error.message });
    });
};

const removeQuantity = (req, res) => {
  const { pid } = req.params;
  const { quantity } = req.query;
  cartServices
    .reduceProductQuantity(req.user.id, pid, parseInt(quantity, 10))
    .then((data) =>
      cartServices.displayCart(data).then((result) => {
        res.status(200).json({ code: 200, message: 'reduce Cart.', result });
      })
    )
    .catch((error) => {
      res.status(406).json({ code: 406, message: error.message });
    });
};

export default {
  addToCart,
  addQuantity,
  removeQuantity,
  viewCartItems,
  clearCartItems,
};
