/** @type {import('sequelize-cli').Migration} */
import { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('wishlists', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        autoIncrement: false,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false,
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
    await queryInterface.dropTable('wishlists');
  },
};
