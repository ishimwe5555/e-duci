/* eslint-disable no-unused-vars */
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';
import Product from './products.model.js';

const Reviews = sequelize.define('reviews', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  feedback: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.ENUM,
    values: ['0', '1', '2', '3', '4', '5'],
    defaultValue: '0',
    allowNull: false,
  },
});

User.hasMany(Reviews, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Reviews.belongsTo(User, {
  foreignKey: 'userId',
  allowNull: false,
  onDelete: 'CASCADE',
});

Reviews.belongsTo(Product, {
  foreignKey: 'productId',
  allowNull: false,
  onDelete: 'CASCADE',
});
export default Reviews;
