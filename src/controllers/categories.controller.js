import { v4 as uuidv4 } from 'uuid';
import { categoryServices } from '../services';

// Controller function to add a category
const addCategory = async (req, res) => {
  const categoryData = req.body;
  const categoryDataArray = Array.isArray(categoryData)
    ? categoryData
    : [categoryData];

  try {
    const promises = categoryDataArray.map(async (category) => {
      const existingCategory = await categoryServices.getCategoryByName(
        category.name
      );

      if (existingCategory) {
        return Promise.resolve(); // Skip adding the category
      }

      return categoryServices.addCategory({
        name: category.name,
        id: uuidv4(),
      });
    });

    await Promise.all(promises);

    return res.status(201).json({
      code: '200',
      message: 'Added categories successfully',
    });
  } catch (error) {
    console.error('Error creating category:', error);
    // Handle the error and send an appropriate response to the client
    return res.status(500).json({ error: 'Error creating category' });
  }
};

// Add subcategories
const addSubcategory = async (req, res) => {
  const subcategoryData = req.body;
  const { catId } = req.params;
  const subcategoryDataArray = Array.isArray(subcategoryData)
    ? subcategoryData
    : [subcategoryData];

  try {
    const promises = subcategoryDataArray.map(async (subcategory) => {
      const existingSubcategory =
        await categoryServices.getSubcategoryByNameAndCategoryId(
          subcategory.name,
          catId
        );

      if (existingSubcategory) {
        return Promise.resolve(); // Skip adding the subcategory
      }

      return categoryServices.addSubcategory(catId, {
        name: subcategory.name,
        id: uuidv4(),
      });
    });

    await Promise.all(promises);

    return res.status(201).json({
      code: '200',
      message: 'Added subcategories successfully',
    });
  } catch (error) {
    console.error('Error creating subcategory:', error);
    // Handle the error and send an appropriate response to the client
    return res.status(500).json({ error: 'Error creating subcategory' });
  }
};

// async function addSubcategory(req, res) {
//   const { catId } = req.params;

//   // Create the subcategory
//   const subcategory = await categoryServices.addSubcategory(catId, req.body);

//   return res.status(201).json({ message: 'Subcategory created', subcategory });
// }

// Controller function to add a subcategory based on a category
// async function addSubsubcategory(req, res) {
//   const { id } = req.params;

//   // Create the subcategory
//   const subsubcategory = await categoryServices.addSubsubcategory(id, req.body);

//   return res
//     .status(201)
//     .json({ message: 'Subcategory created', subsubcategory });
// }
const addSubsubcategory = async (req, res) => {
  const subsubcategoryData = req.body;
  const { subcatId } = req.params;
  const subsubcategoryDataArray = Array.isArray(subsubcategoryData)
    ? subsubcategoryData
    : [subsubcategoryData];

  try {
    const promises = subsubcategoryDataArray.map(async (subsubcategory) => {
      const existingSubsubcategory =
        await categoryServices.getSubsubcategoryByNameAndSubcategoryId(
          subsubcategory.name,
          subcatId
        );

      if (existingSubsubcategory) {
        return Promise.resolve(); // Skip adding the subsubcategory
      }

      return categoryServices.addSubsubcategory(subcatId, {
        name: subsubcategory.name,
        id: uuidv4(),
      });
    });

    await Promise.all(promises);

    return res.status(201).json({
      code: '200',
      message: 'Added subsubcategories successfully',
    });
  } catch (error) {
    console.error('Error creating subsubcategory:', error);
    // Handle the error and send an appropriate response to the client
    return res.status(500).json({ error: error.message });
  }
};
const getCategories = async (req, res) => {
  const categories = await categoryServices.getCategories();

  return res.status(200).json({
    code: '200',
    message: `Fetched all categories`,
    categories,
  });
};

const getSingleCategory = async (req, res) => {
  const { name } = req.params;
  const category = await categoryServices.getCategoryByName(name);
  if (!category) {
    return res.status(404).json({
      code: '404',
      error: `Category not found`,
    });
  }
  return res.status(200).json({
    code: '200',
    message: `Fetched ${name} category`,
    category,
  });
};

const getSingleSubcategory = async (req, res) => {
  const { catId, name } = req.params;
  const subcategory = await categoryServices.getSubcategoryByNameAndCategoryId(
    name,
    catId
  );
  if (!subcategory) {
    return res.status(404).json({
      code: '404',
      error: `subcategory not found`,
    });
  }
  return res.status(200).json({
    code: '200',
    message: `Fetched ${name} subcategory`,
    subcategory,
  });
};

const getSingleSubsubcategory = async (req, res) => {
  const { subcatId, name } = req.params;
  const subsubcategory =
    await categoryServices.getSubsubcategoryByNameAndSubcategoryId(
      name,
      subcatId
    );
  if (!subsubcategory) {
    return res.status(404).json({
      code: '404',
      error: `subsubcategory not found`,
    });
  }
  return res.status(200).json({
    code: '200',
    message: `Fetched ${name} subsubcategory`,
    subsubcategory,
  });
};

const getSubcategories = async (req, res) => {
  const { id } = req.params;
  const subcategories = await categoryServices.getSubcategoryByCategory(id);

  return res.status(200).json({
    code: '200',
    subcategories,
  });
};

const getSubsubcategories = async (req, res) => {
  const { subcatId } = req.params;
  const subsubcategories =
    await categoryServices.getSubSubcategoryBySubCategory(subcatId);

  return res.status(200).json({
    code: '200',
    subsubcategories,
  });
};

async function deleteAllCategories(req, res) {
  const deletedCategories = await categoryServices.deleteAllCategories();
  return res
    .status(201)
    .json({ message: 'All categories deleted', deletedCategories });
}

export default {
  addCategory,
  addSubcategory,
  addSubsubcategory,
  getCategories,
  getSubcategories,
  getSubsubcategories,
  getSingleCategory,
  getSingleSubcategory,
  getSingleSubsubcategory,
  deleteAllCategories,
};
