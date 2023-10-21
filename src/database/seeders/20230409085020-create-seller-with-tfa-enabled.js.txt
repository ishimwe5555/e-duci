/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../utils/password';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const [result] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM users WHERE email='newSeller@gmail.com'
    `);
  // eslint-disable-next-line eqeqeq
  if (result[0].count == 0) {
    const pass = await hashPassword('Ngabo@12345');
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        username: 'newseller',
        email: 'newSeller@gmail.com',
        password: pass,
        role: 'SELLER',
        tfa_enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    "DELETE FROM users WHERE email = 'newSeller@gmail.com'"
  );
}
