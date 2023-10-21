import { DataTypes, Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('users', 'lastPasswordUpdate', {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('NOW()'),
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'passwordStatus', {
      type: DataTypes.ENUM('NEEDS_PASSWORD_UPDATE', 'PASSWORD_UPDATED'),
      defaultValue: 'PASSWORD_UPDATED',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'lastPasswordUpdate');
    await queryInterface.removeColumn('users', 'passwordStatus');
  },
};
