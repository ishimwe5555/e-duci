/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import { hashPassword } from '../../utils/password';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const [result] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM users WHERE email='testing@example.com'
    `);
  // eslint-disable-next-line eqeqeq
  if (result[0].count == 0) {
    await queryInterface.bulkInsert('users', [
      {
        id: '353a6ac5-656f-402e-82b9-79997fb6a04e',
        username: 'testing',
        email: 'testing@example.com',
        password: await hashPassword('Qwert@12345'),
        createdAt: new Date(),
        updatedAt: new Date(),
        lastPasswordUpdate: new Date(),
        passwordStatus: 'PASSWORD_UPDATED',
      },
    ]);
  }
  const [resultThree] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM users WHERE email='seller@example.com'
`);
  // eslint-disable-next-line eqeqeq
  if (resultThree[0].count == 0) {
    await queryInterface.bulkInsert('users', [
      {
        id: '9ca8294e-ff4b-4d3e-a4a9-d20be172fad6',
        username: 'coolseller',
        email: 'seller@example.com',
        role: 'SELLER',
        password: await hashPassword('Qwert@12345'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    "DELETE FROM users WHERE email = 'testing@example.com'"
  );
  await queryInterface.sequelize.query(
    "DELETE FROM users WHERE email = 'seller@example.com'"
  );
  await queryInterface.bulkDelete('collections', null, {});
}
