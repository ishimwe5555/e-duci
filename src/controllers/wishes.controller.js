import { wishListServices } from '../services';
import { asyncWrapper } from '../helpers';

const getWishList = asyncWrapper(async (req, res) => {
  const wishlist = await wishListServices.getWishlistById(req.user.id);
  return res.status(200).json({
    code: 200,
    message: 'retrieved all buyers wishlist.',
    data: wishlist,
  });
});

const addToWishlist = asyncWrapper(async (req, res) => {
  const { pid } = req.params;
  await wishListServices
    .addProductToWishlist(req.user.id, pid)
    .then((wishlist) =>
      res.status(201).json({
        code: 201,
        message: 'Product Added To wishlist.',
        data: wishlist,
      })
    );
});

const removeFromWishlist = asyncWrapper(async (req, res) => {
  const { pid } = req.params;
  wishListServices
    .removeProductFromWishlist(req.user.id, pid)
    .then((wishlist) =>
      res
        .status(200)
        .json({ code: 200, message: 'Removed From Wishlist.', wishlist })
    );
});

export default { addToWishlist, removeFromWishlist, getWishList };
