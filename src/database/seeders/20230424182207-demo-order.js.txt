/** @type {import('sequelize-cli').Migration} */
import { hashPassword } from '../../utils';

const orderId = '41d303c5-8167-4ca7-84d5-ed52b465f2dc';
const userId = '01d313c5-8167-4ca7-84d5-ed52b465f2dc';
const shippingId = '91d313c5-8167-4ca7-84d5-ed02b465f0dc';
module.exports = {
  async up(queryInterface) {
    const [resultOne] = await queryInterface.sequelize.query(`
    SELECT COUNT(*) AS count FROM users WHERE email='orderuser@example.com'
  `);
    // eslint-disable-next-line eqeqeq
    if (resultOne[0].count == 0) {
      await queryInterface.bulkInsert('users', [
        {
          id: userId,
          username: 'orderUser',
          email: 'orderuser@example.com',
          role: 'BUYER',
          password: await hashPassword('Qwert@12345'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    const [resultTwo] = await queryInterface.sequelize.query(`
    SELECT COUNT(*) AS count FROM shippingaddresses WHERE id='91d313c5-8167-4ca7-84d5-ed02b465f0dc'
  `);
    // eslint-disable-next-line eqeqeq
    if (resultTwo[0].count == 0) {
      await queryInterface.bulkInsert('shippingaddresses', [
        {
          id: shippingId,
          userId,
          firstName: 'order',
          lastName: 'man',
          phoneNumber: '250254376543',
          streetAddress: 'street',
          country: 'country',
          city: 'city',
          postalCode: '0000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const [result] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM orders WHERE id='41d303c5-8167-4ca7-84d5-ed52b465f2dc'
`);
    if (result[0].count === '0') {
      await queryInterface.bulkInsert('orders', [
        {
          id: orderId,
          userId,
          status: 'pending',
          shippingId,
          totalPrice: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      `DELETE FROM orders WHERE id='${orderId}'`
    );
    await queryInterface.sequelize.query(
      `DELETE FROM shippingaddresses WHERE id='${shippingId}'`
    );
    await queryInterface.sequelize.query(
      `DELETE FROM users WHERE id='${userId}'`
    );
  },
};
