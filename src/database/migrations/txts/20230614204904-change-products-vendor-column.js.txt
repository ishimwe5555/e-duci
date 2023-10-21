module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('products', 'vendorId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'vendors',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('products', 'vendorId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'vendors', // Change this back to the original model name if needed
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },
};
