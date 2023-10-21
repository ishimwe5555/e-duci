import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Brand from './brands.model.js';

const Logo = sequelize.define('logos', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brandId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Brand,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

Logo.belongsTo(Brand, {
  as: 'logo',
  foreignKey: 'brandId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Logo;
