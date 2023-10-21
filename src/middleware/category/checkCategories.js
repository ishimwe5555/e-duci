import { categoryServices } from '../../services';

const checkCategoryExists = async (req, res, next) => {
  const { category, subcategory, subsubcategory } = req.body;

  try {
    // Check if category exists
    const categoryExists = await categoryServices.getCategoryByName(category);

    if (!categoryExists) {
      return res.status(400).json({ error: 'Category not found' });
    }

    // Check if subcategory exists and belongs to the category
    const subcategoryExists =
      await categoryServices.getSubcategoryByNameAndCategoryId(
        categoryExists.id,
        subcategory
      );

    if (!subcategoryExists) {
      return res
        .status(400)
        .json({ error: 'Subcategory not found in the specified category' });
    }

    // Check if subsubcategory exists and belongs to the subcategory
    const subsubcategoryExists =
      await categoryServices.getSubsubcategoryByNameAndSubcategoryId(
        subcategoryExists.id,
        subsubcategory
      );

    if (!subsubcategoryExists) {
      return res.status(400).json({
        error: 'Subsubcategory not found in the specified subcategory',
      });
    }

    // If all checks pass, continue to the next middleware
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkCategoriesExists = async (req, res, next) => {
  const { category, subcategory, subsubcategory } = req.body;

  try {
    // Check if category exists
    const categoryExists = await categoryServices.getCategoryByName(category);

    if (!categoryExists) {
      return res.status(400).json({ error: 'Category not found' });
    }

    // Check if subcategory exists and belongs to the category
    const subcategoryExists =
      await categoryServices.getSubcategoryByNameAndCategoryId(
        categoryExists.id,
        subcategory
      );

    if (!subcategoryExists) {
      return res
        .status(400)
        .json({ error: 'Subcategory not found in the specified category' });
    }

    // Check if subsubcategory exists and belongs to the subcategory
    const subsubcategoryExists =
      await categoryServices.getSubsubcategoryByNameAndSubcategoryId(
        subcategoryExists.id,
        subsubcategory
      );

    if (!subsubcategoryExists) {
      return res.status(400).json({
        error: 'Subsubcategory not found in the specified subcategory',
      });
    }

    // If all checks pass, continue to the next middleware
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default checkCategoriesExists;
