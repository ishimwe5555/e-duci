/** @type {import('sequelize-cli').Migration} */
import { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn('wishlists', 'id', {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    });
  },

  async down(queryInterface) {
    await queryInterface.changeColumn('wishlists', 'id', {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4,
    });
  },
};
