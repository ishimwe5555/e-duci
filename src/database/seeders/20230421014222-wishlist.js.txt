import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../utils/password';

const userId = '5c2918e4-9482-412a-9c30-1acd08cb5dbb';
// eslint-disable-next-line valid-jsdoc
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const collectionId = await queryInterface.rawSelect(
    'collections',
    {
      where: {
        name: 'testing Collection',
      },
    },
    ['id']
  );
  const [resultOne] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM users WHERE email='testingwishlist@example.com'
`);
  // eslint-disable-next-line eqeqeq
  if (resultOne[0].count == 0) {
    const pass = await hashPassword('Qwert@12345');
    await queryInterface.bulkInsert('users', [
      {
        id: userId,
        username: 'testingWishlist',
        email: 'testingwishlist@example.com',
        password: pass,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
  const [result] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM wishlists WHERE "userId" = '${userId}'
    `);
  // eslint-disable-next-line eqeqeq
  if (result[0].count == 0) {
    await queryInterface.bulkInsert('wishlists', [
      {
        id: uuidv4(),
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
  const [result2] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM products WHERE id = '438ff3ca-7b82-4ead-8deb-3dc46db253d2'
    `);
  // eslint-disable-next-line eqeqeq
  if (result2[0].count == 0) {
    await queryInterface.bulkInsert('products', [
      {
        id: '438ff3ca-7b82-4ead-8deb-3dc46db253d2',
        name: 'cheese',
        price: 100,
        category: 'snacks',
        expDate: '2023',
        bonus: 100,
        quantity: 10,
        collectionId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    `DELETE FROM wishlists WHERE "userId" = '${userId}'`
  );
  await queryInterface.sequelize.query(
    "DELETE FROM users WHERE email = 'testingwishlist@example.com'"
  );

  await queryInterface.sequelize.query(
    `DELETE FROM products WHERE id = '438ff3ca-7b82-4ead-8deb-3dc46db253d2'`
  );
}
