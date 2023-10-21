// eslint-disable-next-line import/no-cycle
import { redisClient } from '../helpers';
import Products from '../database/models/products.model';
import Images from '../database/models/images.model';

async function createCart(id) {
  await redisClient.set(`cart_${id}`, JSON.stringify([]));
  const cart = await redisClient.get(`cart_${id}`);
  return JSON.parse(cart);
}

async function getProductsInCart(userId) {
  const redisProducts = await redisClient.get(`cart_${userId}`);
  const result = !redisProducts
    ? await createCart(userId)
    : JSON.parse(redisProducts);
  return result;
}

async function isInProducts(productId) {
  const product = await Products.findOne({
    where: { id: productId },
  });
  if (!product) {
    throw new Error('Products Not In cart');
  }
  return true;
}

async function getProductDetails(productId) {
  const product = productId
    ? await Products.findOne({
        where: { id: productId },
        include: {
          model: Images,
          as: 'productImages',
        },
      })
    : null;

  const details = {
    id: productId,
    image:
      product && product.productImages.length > 0
        ? product.productImages[0].url
        : '',
    name: product ? product.name : '',
    price: product ? product.price : 0,
  };
  return details;
}

async function displayCart(cart) {
  let sum = 0;
  const productDetails = await Promise.all(
    cart.map(async (product) => {
      const prod = await getProductDetails(product.productId);
      sum += product.quantity * prod.price;
      return { product: prod, quantity: product.quantity };
    })
  );
  const cartObj = {
    products: productDetails,
    total: sum,
  };
  return cartObj;
}

async function getCart(userId) {
  const newCart = await getProductsInCart(userId);
  const cartObj = {
    products: newCart,
    total: 0,
  };
  const productsArray = newCart ? await displayCart(newCart) : cartObj;
  return productsArray;
}

function updateProductsInCart(userId, products) {
  const newProducts = redisClient
    .set(`cart_${userId}`, JSON.stringify(products))
    .then(() => true);
  return newProducts;
}

async function addToCart(userId, pid) {
  await isInProducts(pid.productId);
  const newCart = await getProductsInCart(userId);
  let isInCart = false;
  for (let i = 0; i < newCart.length; i += 1) {
    if (newCart[i].productId === pid.productId) {
      newCart[i].quantity += 1;
      isInCart = true;
      break;
    }
  }
  if (isInCart === false) {
    newCart.push(pid);
  }
  const isUpdated = updateProductsInCart(userId, newCart).then(async () => {
    const result = await getProductsInCart(userId);
    return result;
  });
  return isUpdated;
}

async function reduceProductQuantity(userId, pid, quantity) {
  const newCarts = await getProductsInCart(userId);
  let isInCart = false;
  for (let i = 0; i < newCarts.length; i += 1) {
    if (newCarts[i].productId === pid) {
      newCarts[i].quantity -= quantity || 1;
      if (newCarts[i].quantity <= 0) {
        throw new Error('Cannot reduce');
      }
      isInCart = true;
      break;
    }
  }
  if (isInCart === false) {
    throw new Error('not in cart');
  }
  const isUpdated = await updateProductsInCart(userId, newCarts);
  if (isUpdated) {
    const result = await getProductsInCart(userId);
    return result;
  }
}

async function addProductQuantity(userId, pid, quantity) {
  const newCart = await getProductsInCart(userId);
  let isInCart = false;
  for (let i = 0; i < newCart.length; i += 1) {
    if (newCart[i].productId === pid) {
      newCart[i].quantity += quantity || 1;
      isInCart = true;
      break;
    }
  }
  for (let i = 0; i < newCart.length; i += 1) {
    if (isInCart === false && newCart[i].productId !== pid) {
      throw new Error('not in cart');
    }
  }
  const isUpdate = await updateProductsInCart(userId, newCart);
  if (isUpdate) {
    const result = await getProductsInCart(userId);
    return result;
  }
}
async function clearCart(userId) {
  await redisClient.set(`cart_${userId}`, JSON.stringify([]));
  let products = await redisClient.get(`cart_${userId}`);
  products = JSON.parse(products);
  const cleanedCart = {
    products,
    total: 0,
  };
  return cleanedCart;
}

export default {
  addToCart,
  createCart,
  displayCart,
  reduceProductQuantity,
  addProductQuantity,
  clearCart,
  getCart,
  getProductsInCart,
  getProductDetails,
};
