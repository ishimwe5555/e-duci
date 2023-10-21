import { hashPassword } from '../../utils';

/** @type {import('sequelize-cli').Migration} */
const buyerId = '0f1548b0-b7ce-49e3-a2ef-baffffd390aa';
const shippingaddressId = '51ea5366-ea5c-4501-9ade-4cd50519c84c';

export async function up(queryInterface) {
  const [resultOne] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM users WHERE email='testingbuyer1@gmail.com'
`);
  // eslint-disable-next-line eqeqeq
  if (resultOne[0].count == 0) {
    await queryInterface.bulkInsert('users', [
      {
        id: buyerId,
        username: 'testingbuyer1',
        email: 'testingbuyer1@gmail.com',
        role: 'BUYER',
        password: await hashPassword('Qwert@12345'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
  const [result] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM shippingaddresses WHERE id='${shippingaddressId}'
    `);
  // eslint-disable-next-line eqeqeq
  if (result[0].count == 0) {
    await queryInterface.bulkInsert('shippingaddresses', [
      {
        id: shippingaddressId,
        userId: buyerId,
        firstName: 'testingbuyer',
        lastName: 'client',
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
}

export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    `DELETE FROM shippingaddresses WHERE id = '${shippingaddressId}'`
  );
  await queryInterface.sequelize.query(
    `DELETE FROM users WHERE id = '${buyerId}'`
  );
}
