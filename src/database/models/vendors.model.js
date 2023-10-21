import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Vendors = sequelize.define('vendors', {
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
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Vendors;
