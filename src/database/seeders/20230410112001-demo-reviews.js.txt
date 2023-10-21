import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
const productId = 'c2d6f06c-ee3f-4918-986b-d3656d15216d';
const userId = '0f1548b0-b7ce-49e3-a2ef-baffffd383aa';
const collectionId = '51ea5366-ea5c-4501-9ade-4cd50009c84c';

export async function up(queryInterface) {
  const [result] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM products WHERE id='${productId}'
`);
  // eslint-disable-next-line eqeqeq
  if (result[0].count == 0) {
    await queryInterface.bulkInsert('products', [
      {
        id: productId,
        name: 'testing review product',
        price: 5000,
        category: 'Clothing',
        expDate: '04/11/2040',
        bonus: 20,
        quantity: 50,
        collectionId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
  const [resultOne] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM reviews WHERE "userId"='${userId}' and "productId"= '${productId}'
`);
  // eslint-disable-next-line eqeqeq
  if (resultOne[0].count == 0) {
    await queryInterface.bulkInsert('reviews', [
      {
        id: uuidv4(),
        productId,
        userId,
        feedback: 'Testing review on product',
        rating: '5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}

export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    `DELETE FROM reviews WHERE "userId"='${userId}' and "productId"= '${productId}'`
  );
  await queryInterface.sequelize.query(
    `DELETE FROM products WHERE id = '${productId}'`
  );
}
