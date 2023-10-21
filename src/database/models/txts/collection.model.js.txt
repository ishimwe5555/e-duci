import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Collection = sequelize.define('collections', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

User.hasMany(Collection, {
  as: 'collection',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

export default Collection;
