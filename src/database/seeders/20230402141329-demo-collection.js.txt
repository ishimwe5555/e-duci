import { hashPassword } from '../../utils';

/** @type {import('sequelize-cli').Migration} */
const sellerId = '0f1548b0-b7ce-49e3-a2ef-baffffd383aa';
const collectionId = '51ea5366-ea5c-4501-9ade-4cd50009c84c';

export async function up(queryInterface) {
  const [resultOne] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM users WHERE email='testingseller@example.com'
`);
  // eslint-disable-next-line eqeqeq
  if (resultOne[0].count == 0) {
    await queryInterface.bulkInsert('users', [
      {
        id: sellerId,
        username: 'testingseller',
        email: 'testingseller@example.com',
        role: 'SELLER',
        password: await hashPassword('Qwert@12345'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
  const [result] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM collections WHERE name='testing Collection'
    `);
  // eslint-disable-next-line eqeqeq
  if (result[0].count == 0) {
    await queryInterface.bulkInsert('collections', [
      {
        id: collectionId,
        userId: sellerId,
        name: 'testing Collection',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}

export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    `DELETE FROM collections WHERE id = '${collectionId}'`
  );
  await queryInterface.sequelize.query(
    `DELETE FROM users WHERE id = '${sellerId}'`
  );
}
