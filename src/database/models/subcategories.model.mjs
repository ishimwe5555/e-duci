import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/db.mjs';
import Category from './categories.model.mjs';

const SubCategory = sequelize.define('subcategories', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    foreignKey: {
      references: {
        table: 'categories',
        column: 'id',
      },
    },
  },
});

SubCategory.belongsTo(Category, {
  as: 'subcategory',
  foreignKey: 'categoryId',
  onDelete: 'cascade',
  onUpdate: 'CASCADE',
});

export default SubCategory;
