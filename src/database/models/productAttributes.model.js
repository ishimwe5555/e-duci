import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ProductAttributes = sequelize.define('product_attributes', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  pricing: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  productType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  ageRange: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  subject: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  userGroups: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  classLevel: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  function: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  interaction: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  language: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  curriculum: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  courses: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  keywords: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

export default ProductAttributes;
