export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('users', 'tfa_enabled', {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  });
}
export async function down(queryInterface) {
  await queryInterface.removeColumn('users', 'tfa_enabled');
}
