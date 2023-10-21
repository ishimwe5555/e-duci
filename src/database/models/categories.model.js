import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/db.js';

const Category = sequelize.define('categories', {
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
});

export default Category;
