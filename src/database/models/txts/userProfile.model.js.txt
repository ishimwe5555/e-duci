import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import User from './user.model';

const UserProfile = sequelize.define('user_profile_data', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'id',
    },
  },
  names: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  birthdate: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  language: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  currency: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  postalCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  accountNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  accountName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  telephone: {
    type: Sequelize.STRING(20),
    allowNull: true,
  },
});

UserProfile.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});

export default UserProfile;
