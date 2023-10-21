/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const [result] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM brands WHERE name='Demo Brand'
    `);
  // eslint-disable-next-line eqeqeq
  if (result[0].count == 0) {
    await queryInterface.bulkInsert('brands', [
      {
        id: uuidv4(),
        name: 'Demo Brand',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    "DELETE FROM brands WHERE name = 'Demo Brand'"
  );
}
