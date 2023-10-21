/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeConstraint(
      'products',
      'products_collectionId_fkey'
    );
    await queryInterface.addConstraint('products', {
      fields: ['collectionId'],
      type: 'foreign key',
      name: 'products_collectionId_fkey',
      references: {
        table: 'collections',
        field: 'id',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(
      'products',
      'products_collectionId_fkey'
    );
    await queryInterface.addConstraint('products', {
      fields: ['collectionId'],
      type: 'foreign key',
      name: 'products_collectionId_fkey',
      references: {
        table: 'collections',
        field: 'id',
      },
    });
  },
};
