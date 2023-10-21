import { v4 as uuidv4 } from 'uuid';
import { DataTypes } from 'sequelize';

const migration = {
  async up(queryInterface) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};

export default migration;
