module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the junction table for the many-to-many relationship
    await queryInterface.createTable('product_subsubcategories', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      subsubcategoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'subsubcategories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
    // Add the association to the junction table in the Products model
    await queryInterface.addColumn('products', 'productSubSubCategoryId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'product_subsubcategories',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Add the association to the junction table in the SubSubCategory model
    await queryInterface.addColumn(
      'subsubcategories',
      'productSubSubCategoryId',
      {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'product_subsubcategories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );

    await queryInterface.addColumn('product_attributes', 'productCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('product_attributes', 'productUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('product_attributes', 'promoText', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('product_attributes', 'availableSince', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('product_attributes', 'variations', {
      type: Sequelize.JSONB,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the junction table
    await queryInterface.dropTable('product_subsubcategories');

    // Remove the association column from the SubSubCategory model
    await queryInterface.removeColumn(
      'subsubcategories',
      'productSubSubCategoryId'
    );
    await queryInterface.removeColumn('product_attributes', 'productCode');
    await queryInterface.removeColumn('product_attributes', 'productUrl');
    await queryInterface.removeColumn('product_attributes', 'promoText');
    await queryInterface.removeColumn('product_attributes', 'availableSince');
    await queryInterface.removeColumn('product_attributes', 'variations');
  },
};
