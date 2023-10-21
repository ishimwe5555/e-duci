import Wishlist from '../database/models/wishlist.model.js';

async function createWishlist(userId) {
  const wishlist = await Wishlist.create({ userId });
  return wishlist;
}

async function getWishlistById(userId) {
  const wishlist = await Wishlist.findOne({ where: { userId } });
  return wishlist;
}

async function addProductToWishlist(userId, pid) {
  let wishlist = await getWishlistById(userId);
  if (!wishlist) {
    await createWishlist(userId);
  }
  wishlist = await getWishlistById(userId);
  wishlist.products.push(pid);
  const updatedWishwishlist = await Wishlist.update(
    { products: wishlist.products },
    { where: { userId } }
  );
  return updatedWishwishlist;
}

function removeItem(array, item) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
    return array;
  }
}
async function removeProductFromWishlist(userId, pid) {
  const wishlist = await getWishlistById(userId);
  const updatedWishlist = await Wishlist.update(
    { products: removeItem(wishlist.products, pid) },
    { where: { userId } }
  );
  return updatedWishlist;
}

async function deleteWishlist(userId) {
  const wishlist = await Wishlist.destroy({ where: { userId } });
  return wishlist;
}

export default {
  createWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
  getWishlistById,
  deleteWishlist,
  removeItem,
};
