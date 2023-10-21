/** @type {import('sequelize-cli').Migration} */
import { DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the subsubcategories table
    queryInterface.createTable('subsubcategories', {
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
      subcategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        foreignKey: {
          references: {
            table: 'subcategories',
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
    // Drop the subsubcategories table
    queryInterface.dropTable('subsubcategories');
  },
};
