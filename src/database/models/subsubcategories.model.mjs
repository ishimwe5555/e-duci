import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/db.mjs';
import SubCategory from './subcategories.model.mjs';

const SubSubCategory = sequelize.define('subsubcategories', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  subcategoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    foreignKey: {
      references: {
        table: 'subcategories',
        column: 'id',
      },
    },
  },
});

SubSubCategory.belongsTo(SubCategory, {
  as: 'subsubcategory',
  foreignKey: 'subcategoryId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default SubSubCategory;
