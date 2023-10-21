import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ProductSubsubcategories = sequelize.define('product_subsubcategories', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  productId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  subsubcategoryId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'subsubcategories',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});

export default ProductSubsubcategories;
