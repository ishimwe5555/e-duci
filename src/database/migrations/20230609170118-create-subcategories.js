/** @type {import('sequelize-cli').Migration} */
import { DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the subcategories table
    queryInterface.createTable('subcategories', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        foreignKey: {
          references: {
            table: 'categories',
            column: 'id',
          },
        },
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

  down: async (queryInterface) => {
    // Drop the subcategories table
    queryInterface.dropTable('subcategories');
  },
};
