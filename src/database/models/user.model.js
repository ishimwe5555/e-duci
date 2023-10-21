import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'BUYER', 'SELLER'),
    defaultValue: 'BUYER',
  },
  status: {
    type: DataTypes.ENUM('INACTIVE', 'ACTIVE'),
    defaultValue: 'ACTIVE',
  },
  tfa_enabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  lastPasswordUpdate: {
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.literal('NOW()'),
    allowNull: false,
  },
  passwordStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: 'PASSWORD_UPDATED',
    allowNull: false,
  },
});

export default User;
