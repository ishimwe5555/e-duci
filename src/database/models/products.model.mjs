import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.mjs';
import Images from './images.model.mjs';
import SubSubCategory from './subsubcategories.model.mjs';
import Vendors from './vendors.model.mjs';
import ProductAttributes from './productAttributes.model.mjs';

const Products = sequelize.define('products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vendorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Vendors,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shortDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

Products.hasMany(ProductAttributes, {
  foreignKey: 'productId',
  as: 'productAttributes',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Products.belongsToMany(SubSubCategory, {
  through: 'product_subsubCategories',
  foreignKey: 'productId',
  otherKey: 'subsubcategoryId',
  as: 'subsubcategories',
});

Products.hasMany(Images, { as: 'productImages', onDelete: 'cascade' });

Products.belongsTo(Vendors, {
  as: 'productsVendor',
  foreignKey: 'vendorId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Products;
