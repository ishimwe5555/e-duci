/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable radix */
// import fs from 'fs';
import { productsServices, vendorServices } from '../services';
import { productHelpers } from '../helpers';

const response = (res, cd, msg, dt) =>
  res.status(cd).json({
    code: cd,
    message: msg,
    data: dt,
  });

const getSingleProduct = async (req, res) => {
  const { pid } = req.params;
  const product = await productsServices.getProduct(pid);
  return response(res, 200, 'Product Fetched.', product);
};

const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await productsServices.deleteProduct(pid);
  if (deletedProduct) {
    return res.status(200).json({ code: 200, message: 'Product Deleted.' });
  }
  return res.status(404).json({ code: 404, message: 'Product Not Found.' });
};

const addproduct = async (req, res) => {
  const {
    name,
    vendorId,
    subsubcategoryId,
    brand,
    price,
    pricing,
    description,
    shortDescription,
    productType,
    ageRange,
    subject,
    userGroups,
    classLevel,
    productFunction,
    interaction,
    language,
    curriculum,
    courses,
    keywords,
  } = req.body;

  const img = req.files;

  let url = [];
  if (img.length < 1) {
    res.status(400).json({
      code: '400',
      message: 'Failed',
      error: 'You must select an image',
    });
  } else {
    const { product } = await productsServices.getProductByNameSubAndVendorId(
      name,
      vendorId,
      subsubcategoryId
    );
    if (product === null) {
      if (img.length === 1) {
        const { image } = await productsServices.uploadImage(img[0].path);
        if (image) {
          url = [image.url];
        }
      } else {
        const promises = img.map(async (item) => {
          const { image } = await productsServices.uploadImage(item.path);
          if (image) {
            return image.url;
          }
        });
        url = await Promise.all(promises);
      }

      const productBody = {
        name,
        vendorId,
        subsubcategoryId,
      };

      const { data } = await productsServices.createProduct(productBody);

      const attributesBody = {
        productId: data.id,
        price,
        brand,
        pricing,
        description,
        shortDescription,
        productType,
        ageRange,
        subject,
        userGroups,
        classLevel,
        productFunction,
        interaction,
        language,
        curriculum,
        courses,
        keywords,
      };

      await productsServices.createAttributes(attributesBody);

      if (data != null) {
        if (url.length === 1) {
          const imageBody = { url: url[0], productId: data.id };
          await productsServices.AddImage(imageBody);
          res.status(200).json({
            code: '200',
            message: 'Product Successfully added',
            data,
          });
        } else {
          const sendImage = url.map(async (item) => {
            const imageBody = { url: item, productId: data.id };
            const { images } = await productsServices.AddImage(imageBody);
            return images;
          });
          await Promise.all(sendImage);
          res.status(200).json({
            code: '200',
            message: 'Product Successfully added',
            data,
          });
        }
      }
    }
    if (product) {
      res
        .status(409)
        .json({ code: '409', message: 'Product already exists', product });
    }
  }
};

const importProducts = async (req, res) => {
  const csv = req.file;

  if (!csv) {
    res.status(400).json({
      code: '400',
      message: 'Failed',
      error: 'You must select a CSV file',
    });
    return;
  }

  try {
    const jsonData = await productHelpers.convertCSVtoJSON(csv);
    //    console.log(jsonData);
    // Validate each product data in the JSON file
    const validationPromises = jsonData.map((product) =>
      productHelpers.validateProductData(product)
    );
    const validationResults = await Promise.all(validationPromises);
    // console.log(validationResults);
    const invalidProducts = validationResults
      .map((result, index) => (result ? null : jsonData[index]))
      .filter(Boolean);

    if (invalidProducts.length > 0) {
      const errorMessages = invalidProducts.map((product) => ({
        name: product.name,
        error: 'Invalid product data',
        // Add more specific error properties based on the validation failures
      }));

      res.status(400).json({
        code: '400',
        message: 'Failed',
        errors: errorMessages,
      });
      return;
    }
    // Create new products using the validated data
    // Assuming the `jsonData` array contains objects with properties such as `name`, `price`, `description`, etc.

    const createdProductsPromises = jsonData.map(async (product, index) => {
      try {
        const validationData = validationResults[index];

        // Extract the required fields and data from validationData
        const {
          isValid,
          errors,
          subsubcategoriesMap,
          imageUrl,
          name,
          productUrl,
          vendor,
          description,
          price,
          brand,
          pricing,
          language,
          ageRange,
          subject,
          userGroups,
          interaction,
          productFunction,
          classLevel,
          keywords,
          /* Add other extracted fields here */
        } = validationData;
        const subsubcategoriesId = Object.values(subsubcategoriesMap);
        const vendorData = await vendorServices.getVendorByName(vendor);
        const vendorId =
          vendorData.dataValues.id || '39026b1e-d014-46bc-a0a5-aec2f6d84698';
        const shortDescription = 'Default short description';
        const keywordsArray = keywords.split(',');

        // Check if the product is valid
        if (!isValid) {
          // Handle the case where the product data is invalid based on validationErrors
          console.error('Invalid product data:', errors);
          return null;
        }

        // Now, you can use the extracted data to create a new product in the database
        const createdProduct = await productsServices.createProduct({
          name,
          description,
          price,
          brand,
          vendorId,
          shortDescription,
          /* Add other extracted fields to be inserted into the database */
        });
        const createdProductId = createdProduct.data.dataValues.id;

        // Step 2: Create records in the 'productAttributes' table for the extracted attributes

        try {
          const pricingArray = Array.isArray(pricing)
            ? pricing
            : [pricing || 'free'];
          const classLevelArray = Array.isArray(classLevel)
            ? classLevel
            : [classLevel || ''];
          const ageRangeArray = Array.isArray(ageRange)
            ? ageRange
            : [ageRange || ''];
          const imageUrlArray = Array.isArray(imageUrl)
            ? imageUrl
            : [imageUrl || ''];
          const subjectArray = Array.isArray(subject)
            ? subject
            : [subject || ''];

          const languageArray = Array.isArray(language)
            ? language
            : [language || ''];
          const userGroupsArray = Array.isArray(userGroups)
            ? userGroups
            : [userGroups || ''];
          const productFunctionArray = Array.isArray(productFunction)
            ? productFunction
            : [productFunction || ''];
          const interactionArray = Array.isArray(interaction)
            ? interaction
            : [interaction || ''];
          const keywordsArray = Array.isArray(keywords)
            ? keywords
            : [keywords || ''];

          // Create an object representing the attribute data
          const attributesData = {
            productId: createdProductId,
            ...(productUrl && {
              productUrl,
            }),
            ...(imageUrl && {
              imageUrl: imageUrlArray,
            }),
            ...(pricing && {
              pricing: pricingArray,
            }),
            ...(languageArray && {
              language: languageArray,
            }),
            ...(subjectArray && {
              subject: subjectArray,
            }),
            ...(userGroupsArray && {
              userGroups: userGroupsArray,
            }),
            ...(interactionArray && {
              interaction: interactionArray,
            }),
            ...(productFunctionArray && {
              function: productFunctionArray,
            }),
            ...(classLevelArray && {
              classLevel: classLevelArray,
            }),
            ...(ageRangeArray && {
              ageRange: ageRangeArray,
            }),
            ...(keywordsArray && {
              keywords: keywordsArray,
            }),
          };

          // Create the ProductAttributes record in the database
          await productsServices.createAttributes(attributesData);

          // Return the created attributes, or any other information you need
          // return createdAttributes;
        } catch (error) {
          // Handle any errors that occur during attribute creation, if needed
          console.error('Error creating product attributes:', error);
          throw error; // Rethrow the error to be caught by the calling function
        }

        // Step 3: Create records in the 'product_subsubcategories' table for the subsubcategories
        const productSubSubCategoriesPromises = [];

        if (
          Array.isArray(subsubcategoriesId) &&
          subsubcategoriesId.length > 0
        ) {
          // Handle the case when there are one or more subsubcategories
          if (subsubcategoriesId.length === 1) {
            // When there is only one subsubcategory
            const subsubcategoryId = subsubcategoriesId[0];
            productSubSubCategoriesPromises.push(
              productsServices.createProductSubsubcategory({
                productId: createdProductId,
                subsubcategoryId,
              })
            );
          } else {
            // When there are multiple subsubcategories
            const subsubcategoryPromises = subsubcategoriesId.map(
              (subsubcategoryId) =>
                productsServices.createProductSubsubcategory({
                  productId: createdProductId,
                  subsubcategoryId,
                })
            );
            productSubSubCategoriesPromises.push(...subsubcategoryPromises);
          }
        } else {
          // Handle the case when there are no subsubcategories (optional, based on your requirement)
          // You can add some default behavior here, or simply skip this block if you don't need it.
          console.error('No subsubcategories found for product');
        }

        await Promise.all(productSubSubCategoriesPromises);

        // Return the created product so that we can filter successful and failed products later
        return createdProduct;
      } catch (error) {
        // Handle any errors that occur during product creation, if needed
        console.error('Error creating product:', error);
        return null;
      }
    });

    const createdProducts = await Promise.all(createdProductsPromises);

    // Remove any products that failed to create (null values in the createdProducts array)
    const successfulProducts = createdProducts.filter(Boolean);

    if (successfulProducts.length === 0) {
      // Handle the case where all products failed to create
      res.status(500).json({
        code: '500',
        message: 'Failed',
        error: 'Error creating products in the database',
      });
      return;
    }
    // Create new products using the validated data
    // You can write your code here to create the products in the database

    res.status(200).json({
      code: '200',
      message: 'Products have been added successfully',
      data: jsonData,
    });
  } catch (error) {
    console.error('Error importing products:', error);
    res.status(500).json({
      code: '500',
      message: 'Failed',
      error: 'Error importing products',
    });
  }
};

const updateOnadd = async (req, res) => {
  const productId = req.params.id;
  const { productName, productPrice, expDate, category, bonus, quantity } =
    req.body;

  const product = await productsServices.getProductById(productId);
  if (product) {
    const body = {
      name: productName,
      price: productPrice,
      category,
      expDate,
      bonus,
      quantity,
    };

    const { updated } = await productsServices.addUpdate(body, productId);
    if (updated != null) {
      res.status(200).json({
        code: '200',
        message: 'Successful Updated The Product with no images',
        product: updated,
      });
    }
  }
};

const searchProducts = async (req, res) => {
  try {
    const products = await productsServices.searchproduct(req.query);
    return res.status(200).json({
      code: 200,
      message: 'search list',
      products,
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message, error });
  }
};

const listItems = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;
  const userId = req.user.id;
  const collection = req.params.cid;
  const product = await collectionServices.findCollection(userId, collection, {
    offset,
    limit,
  });
  const totalCount = await collectionServices.getTotalCollectionCount(
    userId,
    collection
  );
  const totalPage = Math.ceil(totalCount / limit);
  return res.status(200).json({
    code: 200,
    message: 'All items are all retrieved',
    product,
    totalPage,
    page,
  });
};

const listAllItems = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  const offset = (page - 1) * limit;

  const products = await productsServices.findAllProducts({ offset, limit });

  const totalCount = await productsServices.getTotalProductsCount();

  const totalPages = Math.ceil(totalCount / limit);

  return res.status(200).json({
    code: 200,
    message: `Products for page ${page} are retrieved`,
    products,
    page,
    totalPages,
  });
};

const getProductByCategory = async (req, res) => {
  const { subcategoryId } = req.params;
  const products = await productsServices.getProductsByCategory(subcategoryId);

  return response(res, 200, 'Products Fetched by Category.', products);
};

export default {
  getSingleProduct,
  deleteProduct,
  addproduct,
  updateOnadd,
  searchProducts,
  listItems,
  listAllItems,
  getProductByCategory,
  importProducts,
};
