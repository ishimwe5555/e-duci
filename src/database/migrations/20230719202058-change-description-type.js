module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('products', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If you ever need to rollback the migration, you can change the data type back to STRING
    await queryInterface.changeColumn('products', 'description', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
