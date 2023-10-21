import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Brand = sequelize.define('brands', {
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
});

export default Brand;
