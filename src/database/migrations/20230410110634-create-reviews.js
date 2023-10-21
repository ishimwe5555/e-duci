import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const values = ['0', '1', '2', '3', '4', '5'];

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuidv4,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'products',
          key: 'id',
        },
      },
      userId: {
        onDelete: 'CASCADE',
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      feedback: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rating: {
        type: Sequelize.ENUM,
        values,
        allowNull: false,
        defaultValue: '0',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query('DROP TABLE reviews cascade;');
  },
};
