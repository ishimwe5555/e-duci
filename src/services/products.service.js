import { Op } from 'sequelize';
import { extractPublicId } from 'cloudinary-build-url';
import Products from '../database/models/products.model';
import Images from '../database/models/images.model';
import Cloudinary from '../helpers/cloudinary';
import ProductAttributes from '../database/models/productAttributes.model';
import ProductSubsubcategories from '../database/models/productSubsubcategoties.model';

async function createProduct(body, options) {
  const data = await Products.create(body, options);
  return { data, err: null };
}

async function createAttributes(body, options) {
  const data = await ProductAttributes.create(body, options);
  return { data, err: null };
}

async function createProductSubsubcategory(body, options) {
  const data = await ProductSubsubcategories.create(body, options);
  return { data, err: null };
}

async function addUpdate(body, productId) {
  const find = await Products.findOne({ where: { id: productId } });
  if (find) {
    const updated = await find.update(body);
    return { updated, err: null };
  }
}

async function uploadImage(path) {
  const image = await Cloudinary.uploader.upload(path);
  return { image };
}
async function deleteImage(id) {
  const image = await Images.findOne({ where: { id } });
  await Images.destroy({ where: { id } });
  const publice = extractPublicId(image.url);
  const data = await Cloudinary.uploader.destroy(publice);
  return { data };
}
async function AddImage(body) {
  const data = await Images.create(body);
  return { data };
}
async function getProductByNameSubAndVendorId(name, vid, subId) {
  const product = await Products.findOne({
    where: { name, vendorId: vid, subsubcategoryId: subId },
  });
  return { product };
}
async function getProductById(id) {
  const product = await Products.findOne({
    where: { id },
    include: {
      model: Images,
      as: 'productImages',
    },
  });
  return product;
}

async function getProductsByVendor(id) {
  const products = await Products.findAll({
    where: { vendorId: id },
    include: {
      model: Images,
      as: 'productImages',
    },
  });
  return products;
}

async function getProductsBySubsubcategory(id) {
  const products = await Products.findAll({
    where: { subcategoryId: id },
    include: {
      model: Images,
      as: 'productImages',
    },
  });
  return products;
}

async function getProduct(pid) {
  const products = await Products.findOne({
    where: { id: pid },
    include: [
      { model: Images, as: 'productImages', attributes: ['url'] },
      { model: ProductAttributes, as: 'productAttributes' },
    ],
  });
  if (!products) {
    return [];
  }
  return products;
}

async function findAllProducts({ offset, limit }) {
  const products = await Products.findAll({
    include: [
      { model: Images, as: 'productImages', attributes: ['url'] },
      { model: ProductAttributes, as: 'productAttributes' },
    ],
    offset,
    limit,
  });
  return products;
}

async function getTotalProductsCount() {
  const products = await Products.findAll();
  return products.length;
}

async function searchproduct(query) {
  if (!query.minPrice) {
    query.minPrice = 0;
  }
  if (!query.maxPrice) {
    query.maxPrice = Infinity;
  }
  if (query.minPrice > query.maxPrice) {
    query.minPrice = null;
  }
  if (!query.key) {
    query.key = '';
  }
  const product = await Products.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${query.key}%` } },
        // { category: { [Op.iLike]: `%${query.key}%` } },
      ],
      price: { [Op.between]: [query.minPrice, query.maxPrice] },
    },
  });
  return product;
}

function removeUrlFromImages(pImages, idi) {
  return pImages.filter((image) => image !== idi);
}
async function expiredProductDate() {
  const foundProduct = Products.findAll({
    where: {
      expDate: {
        [Op.lt]: new Date(),
      },
    },
  });
  return foundProduct;
}
// async function updateProductStatus(Product) {
//   const status = await Promise.all(
//     Product.map(async (product) => {
//       product.expiredflag = true;
//       await product.save();
//     })
//   );
//   return status;
// }

async function deleteProduct(productId) {
  const deletedProduct = await Products.destroy({
    where: { id: productId },
  });
  return deletedProduct;
}
async function deleteAllProducts() {
  try {
    // Fetch all products from the database
    const allProducts = await Products.findAll();

    // Create an array of promises to delete each product
    const deletePromises = allProducts.map((product) =>
      deleteProduct(product.id)
    );

    // Wait for all the delete operations to complete
    await Promise.all(deletePromises);

    // Return a message or any relevant information after deletion
    return 'All products have been deleted successfully.';
  } catch (error) {
    // Handle any errors that might occur during the deletion process
    console.error('Error deleting products:', error);
    throw error;
  }
}

export default {
  createProduct,
  addUpdate,
  uploadImage,
  getProductByNameSubAndVendorId,
  getProductById,
  deleteImage,
  AddImage,
  searchproduct,
  findAllProducts,
  getTotalProductsCount,
  expiredProductDate,
  removeUrlFromImages,
  getProduct,
  deleteProduct,
  getProductsByVendor,
  getProductsBySubsubcategory,
  createAttributes,
  createProductSubsubcategory,
  deleteAllProducts,
};
