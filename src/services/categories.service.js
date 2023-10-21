import { Sequelize } from 'sequelize';
import Category from '../database/models/categories.model';
import SubCategory from '../database/models/subcategories.model';
import SubSubCategory from '../database/models/subsubcategories.model';

async function addCategory(body) {
  const category = await Category.create(body);
  return category;
}
async function getCategory(id) {
  const category = await Category.findOne({ where: { id } });
  return category;
}
async function checkCategoriesExist(categories) {
  const existingCategories = await Category.findAll({
    name: { $in: categories },
  });
  return existingCategories;
}
async function getCategoryByName(name) {
  const category = await Category.findOne({
    where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
      [Sequelize.Op.iLike]: name.toLowerCase(),
    }),
  });
  return category;
}
async function deleteCategory(id) {
  return Category.destroy({ where: { id } });
}
async function deleteAllCategories() {
  return Category.destroy({ where: {} });
}
// Check if subcategory belongs to the category
async function getSubcategoryByNameAndCategoryId(name, catId) {
  const subcategory = await SubCategory.findOne({
    where: Sequelize.and(
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
        [Sequelize.Op.iLike]: name.toLowerCase(),
      }),
      { categoryId: catId }
    ),
  });
  return subcategory;
}

// Check if subcategory belongs to the category
async function getSubsubcategoryByNameAndSubcategoryId(name, subcatId) {
  const subsubcategory = await SubSubCategory.findOne({
    where: Sequelize.and(
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
        [Sequelize.Op.iLike]: name.toLowerCase(),
      }),
      { subcategoryId: subcatId }
    ),
  });
  return subsubcategory;
}

async function getSubcategory(id) {
  const subcategory = await SubCategory.findOne({ where: { id } });
  return subcategory;
}

async function getSubsubcategory(id) {
  const subsubcategory = await SubSubCategory.findOne({ where: { id } });
  return subsubcategory;
}

async function addSubcategory(categoryId, body) {
  const category = await getCategory(categoryId);
  if (!category) {
    throw new Error('Category not found');
  }

  body.categoryId = categoryId;
  const subcategory = await SubCategory.create(body);
  return subcategory;
}

async function addSubsubcategory(subcategoryId, body) {
  const subcategory = await getSubcategory(subcategoryId);
  if (!subcategory) {
    throw new Error('Subcategory not found');
  }

  body.subcategoryId = subcategoryId;
  const subsubcategory = await SubSubCategory.create(body);
  return subsubcategory;
}

async function getCategories() {
  const categories = await Category.findAll();
  return categories;
}

async function getSubcategoryByCategory(categoryId) {
  const subcategories = await SubCategory.findAll({ where: { categoryId } });
  return subcategories;
}

async function getSubSubcategoryBySubCategory(subcategoryId) {
  const subsubcategories = await SubSubCategory.findAll({
    where: { subcategoryId },
  });
  return subsubcategories;
}

export default {
  addCategory,
  addSubcategory,
  addSubsubcategory,
  getCategories,
  getSubcategoryByCategory,
  getSubSubcategoryBySubCategory,
  getSubcategory,
  getSubsubcategory,
  getCategoryByName,
  getSubcategoryByNameAndCategoryId,
  getSubsubcategoryByNameAndSubcategoryId,
  deleteCategory,
  deleteAllCategories,
  checkCategoriesExist,
};
