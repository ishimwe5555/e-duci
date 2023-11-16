import csv from 'csvtojson';
import { categoryServices } from '../services/index.mjs';

async function convertCSVtoJSON(filePath) {
  try {
    const jsonArray = await csv().fromFile(filePath.path);
    return jsonArray;
  } catch (error) {
    console.error('Error converting CSV to JSON:', error.message);
    throw new Error('Error converting CSV to JSON');
  }
}
// Function to check if all categories exist
async function checkCategoriesExist(categories) {
  try {
    // Assuming you have a "Category" model or collection in your database
    const existingCategories = await categoryServices.getCategoryByName(
      categories
    );
    // console.log(existingCategories);
    // Compare the number of existing categories with the number of input categories
    return existingCategories.length === categories.length;
  } catch (error) {
    console.error('Error checking categories:', error);
    throw new Error('Error checking categories');
  }
}

// Function to check if all subcategories exist for each category
async function checkSubcategoriesExist(categorySubcategoryPairs) {
  try {
    const promises = categorySubcategoryPairs.map(async (pair) => {
      const { category, subcategory } = pair;
      const categoryData = await categoryServices.getCategoryByName(category);
      const catId = categoryData.dataValues.id;
      const existingSubcategory =
        await categoryServices.getSubcategoryByNameAndCategoryId(
          subcategory,
          catId
        );

      return !!existingSubcategory;
    });

    const results = await Promise.all(promises);

    return results.every((result) => result);
  } catch (error) {
    console.error('Error checking subcategories:', error);
    throw new Error('Error checking subcategories');
  }
}

// Function to check if all subsubcategories exist for each subcategory
async function checkSubsubcategoriesExist(subsubcategoryPairs) {
  try {
    const promises = subsubcategoryPairs.map(async (pair) => {
      const { subcategory, subsubcategory } = pair;
      const existingSubsubcategory =
        await categoryServices.getSubsubcategoryByNameAndSubcategoryId(
          subsubcategory,
          subcategory.categoryId
        );

      return !!existingSubsubcategory;
    });

    const results = await Promise.all(promises);

    return results.every((result) => result);
  } catch (error) {
    console.error('Error checking subsubcategories:', error);
    throw new Error('Error checking subsubcategories');
  }
}

function removeDuplicateObjects(arrayOfArrays) {
  const uniqueSet = new Set();
  const uniqueArrayOfObjects = [];

  arrayOfArrays.forEach((subArray) => {
    const obj = subArray[0];
    const stringifiedObj = JSON.stringify(obj);
    if (!uniqueSet.has(stringifiedObj)) {
      uniqueSet.add(stringifiedObj);
      uniqueArrayOfObjects.push(obj);
    }
  });

  return uniqueArrayOfObjects;
}
function extractFeature(inputString) {
  const features = inputString.split(';');
  const extractedFeatures = [];

  features.forEach((featureString) => {
    const splitResult = featureString.split(':');
    try {
      if (splitResult.length >= 2 && splitResult[0].trim() !== '') {
        const [key, value] = splitResult;
        const extractedObject = {
          key: key.trim(),
          value: value.trim(),
        };
        extractedFeatures.push(extractedObject);
      } else {
        console.log('Skipping invalid attribute:', featureString);

        // Handle the case where the splitResult is empty or has only one element
        // For example, you can skip this item or handle it differently.
      }
    } catch (error) {
      console.log(error);
      // Handle the case where the categoryString doesn't have enough elements
      // For example, you can skip this item or handle it differently.
    }
  });
  return extractedFeatures;
}

function extractToObject(inputString) {
  const categories = inputString.split(';');
  const extractedObjects = [];

  categories.forEach((categoryString) => {
    const splitResult = categoryString.split('>');
    try {
      const [category, subcategory, subsubcategory] = splitResult;
      const extractedObject = {
        category: category.trim(),
        subcategory: subcategory ? subcategory.trim() : '', // Check for existence before trimming
        subsubcategory: subsubcategory ? subsubcategory.trim() : '', // Check for existence before trimming
      };
      extractedObjects.push(extractedObject);
      // console.log(extractedObjects);
    } catch (error) {
      console.log(error);
      // Handle the case where the categoryString doesn't have enough elements
      // For example, you can skip this item or handle it differently.
    }
  });
  return extractedObjects;
}
async function checkCategoriesAndSubcategories(categoriesArrays) {
  const checkCategoryPromises = categoriesArrays.map(async (object) => {
    const { category, subcategory, subsubcategory } = object;
    try {
      const categoryInfo = await categoryServices.getCategoryByName(category);
      if (!categoryInfo) {
        throw new Error(`Category '${category}' not found.`);
      }

      const catId = categoryInfo.dataValues.id;
      const subcategoryInfo =
        await categoryServices.getSubcategoryByNameAndCategoryId(
          subcategory,
          catId
        );
      if (!subcategoryInfo) {
        throw new Error(
          `Subcategory '${subcategory}' not found for category '${category}'.`
        );
      }

      const subcatId = subcategoryInfo.dataValues.id;
      const subsubcategoryInfo =
        await categoryServices.getSubsubcategoryByNameAndSubcategoryId(
          subsubcategory,
          subcatId
        );
      if (!subsubcategoryInfo) {
        throw new Error(
          `Subsubcategory '${subsubcategory}' not found for subcategory '${subcategory}'.`
        );
      }

      return { ...object, categoryInfo, subcategoryInfo, subsubcategoryInfo };
    } catch (error) {
      console.error('Error:', error.message);
      // You can handle the error here, either by setting default values or returning null/undefined.
      // For example, you might want to return null to indicate that this specific object has missing data.
      return null;
    }
  });

  return Promise.all(checkCategoryPromises);
}

// Function to validate product data and check if all categories, subcategories, and subsubcategories exist
async function validateCategories(categories) {
  const categoriesArrays = extractToObject(categories);
  const allCategoriesExist = await checkCategoriesAndSubcategories(
    categoriesArrays
  );
  const validationErrors = [];

  // Create an object to store the subsubcategories of each product by their names
  const subsubcategoriesMap = {};

  // Iterate through the allCategoriesExist array to extract subsubcategories
  allCategoriesExist.forEach((product) => {
    const { subsubcategoryInfo } = product;

    // Check if subsubcategoryInfo exists and if it contains dataValues
    if (subsubcategoryInfo && subsubcategoryInfo.dataValues) {
      // Extract the name and ID of the subsubcategory
      const subsubcategoryName = subsubcategoryInfo.dataValues.name;
      const subsubcategoryID = subsubcategoryInfo.dataValues.id;

      // Store the subsubcategory in the map using its name as the key
      subsubcategoriesMap[subsubcategoryName] = subsubcategoryID;
    }
  });

  if (!allCategoriesExist) {
    validationErrors.push({
      field: 'Categories',
      error: 'Category does not exist',
    });
  }

  return {
    isValid: validationErrors.length === 0,
    errors: validationErrors,
    subsubcategoriesMap, // Include the subsubcategories map in the response
  };
}

// Function to validate product data and check if all categories, subcategories, and subsubcategories exist
async function validateProductData(product) {
  const {
    Category,
    Vendor: vendor,
    Description: description,
    'Short description': shortDescription,
    'Product name': name,
    Price: price,
    'Product Url': productUrl /* other required fields */,
    'Image URL': imageUrl,
    'Detailed Image URL': detailedImageUrl,
    'Search words': keywords,
  } = product;

  // Validate the categories (assuming this function returns a validation result with subsubcategoriesMap)
  const categoryValidationResult = await validateCategories(Category);

  // Extract the subsubcategories map from the categoryValidationResult
  const { subsubcategoriesMap } = categoryValidationResult;

  // Validate other required fields
  const validationErrors = [];

  if (!vendor) {
    validationErrors.push({
      field: 'Vendor',
      error: 'Vendor is required.',
    });
  }

  if (!description) {
    validationErrors.push({
      field: 'Description',
      error: 'Description is required.',
    });
  }

  if (!name) {
    validationErrors.push({
      field: 'Title',
      error: 'Product name is required.',
    });
  }

  if (!price) {
    validationErrors.push({
      field: 'Price',
      error: 'Price is required.',
    });
  }

  // Add validations for other required fields here
  // Extract the features
  const featuresArray = extractFeature(product.Features);
  // Create an empty object to store the attributes
  const productAttributes = {};

  // Loop through the attributesArray and store the values in the productAttributes object
  featuresArray.forEach((feature) => {
    productAttributes[feature.key] = feature.value;
  });
  // console.log(productAttributes);
  const {
    Brand: brand,
    Pricing: pricing,
    Language: language,
    'Age Range': ageRange,
    Subject: subject,
    'User groups': userGroups,
    Interaction: interaction,
    Function: productFunction,
    'Class level': classLevel,
  } = productAttributes;
  // Return the combined validation results
  return {
    isValid: validationErrors.length === 0,
    errors: validationErrors,
    subsubcategoriesMap, // Include the subsubcategories map in the response
    imageUrl, // Include the renamed field "Product Url" as "productUrl"
    name,
    productUrl,
    vendor,
    description,
    shortDescription,
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
    detailedImageUrl,
  };
}

function groupObjectsByProperty(objects, propertyName) {
  const groupedObject = {};

  objects.forEach((obj) => {
    const propertyValue = obj[propertyName];
    if (!groupedObject[propertyValue]) {
      groupedObject[propertyValue] = [];
    }
    groupedObject[propertyValue].push(obj);
  });

  return groupedObject;
}

// const extractedObjects = extractToObject(inputString);

// const groupedByCategory = groupObjectsByProperty(extractedObjects, 'category');
// const groupedBySubcategory = groupObjectsByProperty(
//   extractedObjects,
//   'subcategory'
// );
// const groupedBySubsubcategory = groupObjectsByProperty(
//   extractedObjects,
//   'subsubcategory'
// );

// console.log('Grouped by Category:', groupedByCategory);
// console.log('Grouped by Subcategory:', groupedBySubcategory);
// console.log('Grouped by Subsubcategory:', groupedBySubsubcategory);

export default {
  convertCSVtoJSON,
  validateCategories,
  checkCategoriesExist,
  checkSubcategoriesExist,
  checkSubsubcategoriesExist,
  extractToObject,
  validateProductData,
};

// async function checkCategoriesExist(categories) {
//   try {
//     // Assuming you have a "Category" model or collection in your database
//     const existingCategories = await categoriesService.getCategoryByName({
//       name: { $in: categories },
//     });

//     // Compare the number of existing categories with the number of input categories
//     return existingCategories.length === categories.length;
//   } catch (error) {
//     console.error('Error checking categories:', error);
//     throw new Error('Error checking categories');
//   }
// }

// async function checkSubcategoriesExist(subcategories) {
//   try {
//     // Assuming you have a "Category" model or collection in your database
//     const existingCategories = await categoriesService.getCategoryByName({
//       name: { $in: subcategories },
//     });

//     // Compare the number of existing categories with the number of input categories
//     return existingCategories.length === categories.length;
//   } catch (error) {
//     console.error('Error checking categories:', error);
//     throw new Error('Error checking categories');
//   }
// }
// // productValidator.js

// // Function to validate product data and check if all categories, subcategories, and subsubcategories exist
// async function validateCategories(product) {
//   const {
//     Category: categoryString,
//     'Secondary categories': subcategoryString,
//     'Tertiary categories': subsubcategoryString,
//   } = product;

//   const categories = categoryString
//     .split('///')
//     .map((category) => category.trim());
//   const subcategories = subcategoryString
//     .split('///')
//     .map((subcategory) => subcategory.trim());
//   const subsubcategories = subsubcategoryString
//     .split('///')
//     .map((subsubcategory) => subsubcategory.trim());

//   const allCategoriesExist = await checkCategoriesExist(categories);
//   const allSubcategoriesExist = await checkSubcategoriesExist(subcategories);
//   const allSubsubcategoriesExist = await checkSubsubcategoriesExist(
//     subsubcategories
//   );

//   return (
//     allCategoriesExist && allSubcategoriesExist && allSubsubcategoriesExist
//   );
// }

// // Function to check if all categories exist
// async function checkCategoriesExist(categories) {
//   // Implement the logic to check if all categories exist in the database
//   // You can make appropriate database queries here or call your existing functions
//   // Return a boolean indicating if all categories exist
// }
// async function checkCategoriesExist(categories) {
//   try {
//     // Assuming you have a "Category" model or collection in your database
//     const existingCategories = await Category.find({
//       name: { $in: categories },
//     });

//     // Compare the number of existing categories with the number of input categories
//     return existingCategories.length === categories.length;
//   } catch (error) {
//     console.error('Error checking categories:', error);
//     throw new Error('Error checking categories');
//   }
// }

// // Function to check if all subcategories exist
// async function checkSubcategoriesExist(subcategories) {
//   // Implement the logic to check if all subcategories exist in the database
//   // You can make appropriate database queries here or call your existing functions
//   // Return a boolean indicating if all subcategories exist
// }

// // Function to check if all subsubcategories exist
// async function checkSubsubcategoriesExist(subsubcategories) {
//   // Implement the logic to check if all subsubcategories exist in the database
//   // You can make appropriate database queries here or call your existing functions
//   // Return a boolean indicating if all subsubcategories exist
// }
