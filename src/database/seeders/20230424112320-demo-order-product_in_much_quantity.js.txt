import { hashPassword } from '../../utils';

/** @type {import('sequelize-cli').Migration} */
const sellerId = '2fc70444-9258-4fb5-98fd-13200741413c';
const productId = 'a2dafc4b-35a3-44f5-84a4-e8772b37ca39';
const collectionId = '368f8f69-2536-4515-9a78-04a38de60f73';
const buyerId = '1dcf1730-d004-4958-b00c-d23de98d808b';
const shippingaddressId = '64ab3bd8-31f3-4081-b128-7a7f5a05c1f4';

export async function up(queryInterface) {
  const [resultuno] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM users WHERE email='testingbuyer2@gmail.com'
`);
  // eslint-disable-next-line eqeqeq
  if (resultuno[0].count == 0) {
    await queryInterface.bulkInsert('users', [
      {
        id: buyerId,
        username: 'testingbuyer2',
        email: 'testingbuyer2@gmail.com',
        role: 'BUYER',
        password: await hashPassword('Qwert@12345'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }

  const [resultdos] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM shippingaddresses WHERE id='${shippingaddressId}'
`);
  // eslint-disable-next-line eqeqeq
  if (resultdos[0].count == 0) {
    await queryInterface.bulkInsert('shippingaddresses', [
      {
        id: shippingaddressId,
        userId: buyerId,
        firstName: 'testingbuyer2',
        lastName: 'client2',
        phoneNumber: '07062323233',
        streetAddress: 'kk938st',
        country: 'rwanda',
        city: 'kigali',
        postalCode: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
  const [resultOne] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM users WHERE email='testingseller11@example.com'
`);
  // eslint-disable-next-line eqeqeq
  if (resultOne[0].count == 0) {
    await queryInterface.bulkInsert('users', [
      {
        id: sellerId,
        username: 'testingseller11',
        email: 'testingseller11@example.com',
        role: 'SELLER',
        password: await hashPassword('Qwert@12345'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
  const [result] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM collections WHERE name='testing user checkout collection1'
    `);
  // eslint-disable-next-line eqeqeq
  if (result[0].count == 0) {
    await queryInterface.bulkInsert('collections', [
      {
        id: collectionId,
        userId: sellerId,
        name: 'testing user checkout collection1',
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
        name: 'testing checkout2',
        price: 2000,
        category: 'test',
        quantity: 20000,
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
    `DELETE FROM shippingaddresses WHERE id = '${shippingaddressId}'`
  );

  await queryInterface.sequelize.query(
    `DELETE FROM products WHERE id = '${productId}'`
  );

  await queryInterface.sequelize.query(
    `DELETE FROM collections WHERE id = '${collectionId}'`
  );

  await queryInterface.sequelize.query(
    `DELETE FROM users WHERE id = '${sellerId}'`
  );

  await queryInterface.sequelize.query(
    `DELETE FROM users WHERE id = '${buyerId}'`
  );
}
