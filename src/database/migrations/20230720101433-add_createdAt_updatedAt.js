module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('product_subsubcategories', 'createdAt', {
    //   type: Sequelize.DATE,
    //   allowNull: false,
    //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    // });

    await queryInterface.addColumn('product_subsubcategories', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('product_subsubcategories', 'createdAt');
    await queryInterface.removeColumn('product_subsubcategories', 'updatedAt');
  },
};
