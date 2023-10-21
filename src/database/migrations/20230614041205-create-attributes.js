/** @type {import('sequelize-cli').Migration} */
import { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_attributes', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      pricing: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      productType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ageRange: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      subject: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      userGroups: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      classLevel: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      function: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      interaction: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      language: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      curriculum: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      courses: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      keywords: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
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
    await queryInterface.dropTable('product_attributes');
  },
};
