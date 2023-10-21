import { v4 as uuidv4 } from 'uuid';
import { DataTypes } from 'sequelize';

const migration = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_profile_data', {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      names: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accountName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telephone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('user_profile_data', {
      type: 'foreign key',
      name: 'fk_user_profile_data_userId',
      fields: ['userId'],
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(
      'user_profile_data',
      'fk_user_profile_data_userId'
    );
    await queryInterface.dropTable('user_profile_data');
  },
};
export default migration;
