import { hashPassword } from '../../utils';

/** @type {import('sequelize-cli').Migration} */
const sellerId = '0f1548b0-b7ce-49e3-a2ef-baffeed384aa';
const productId = '51ea5366-ea5c-4501-9ade-4cd51129c89c';
const collectionId = 'a82f6a12-34ee-40dc-a4fc-b1a267ae3b46';

export async function up(queryInterface) {
  const [resultOne] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM users WHERE email='testingseller09@example.com'
`);
  // eslint-disable-next-line eqeqeq
  if (resultOne[0].count == 0) {
    await queryInterface.bulkInsert('users', [
      {
        id: sellerId,
        username: 'testingseller09',
        email: 'testingseller09@example.com',
        role: 'SELLER',
        password: await hashPassword('Qwert@12345'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
  const [result] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM collections WHERE name='testing user checkout collection'
    `);
  // eslint-disable-next-line eqeqeq
  if (result[0].count == 0) {
    await queryInterface.bulkInsert('collections', [
      {
        id: collectionId,
        userId: sellerId,
        name: 'testing user checkout collection',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
  const [resulttwo] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM products WHERE id='${productId}'
    `);
  // eslint-disable-next-line eqeqeq
  if (resulttwo[0].count == 0) {
    await queryInterface.bulkInsert('products', [
      {
        id: productId,
        name: 'testing checkout',
        price: 2000,
        category: 'test',
        quantity: 2,
        expDate: '2000-02-02',
        bonus: 0,
        collectionId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}

export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    `DELETE FROM products WHERE id = '${productId}'`
  );

  await queryInterface.sequelize.query(
    `DELETE FROM collections WHERE id = '${collectionId}'`
  );

  await queryInterface.sequelize.query(
    `DELETE FROM users WHERE id = '${sellerId}'`
  );
}
