import { v4 as uuid } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
const productId = '0f1548b0-b7ce-49e3-a2ef-baffffd383ab';
const collectionId = '51ea5366-ea5c-4501-9ade-4cd50009c84c';

export async function up(queryInterface) {
  const [resultOne] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM products WHERE id='${productId}'
`);
  // eslint-disable-next-line eqeqeq
  if (resultOne[0].count == 0) {
    await queryInterface.bulkInsert('products', [
      {
        id: productId,
        name: 'testing product',
        price: 500000,
        category: 'Food',
        expDate: '04/11/2023',
        bonus: 20000,
        quantity: 50,
        collectionId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
  const [resultTwo] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM images WHERE "productId"='${productId}'
`);
  // eslint-disable-next-line eqeqeq
  if (resultTwo[0].count == 0) {
    await queryInterface.bulkInsert('images', [
      {
        id: uuid(),
        url: 'http://res.cloudinary.com/duuznxvqs/image/upload/v1681817484/lnvgagkj5j7tagnxmgww.jpg',
        productId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}

export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    `DELETE FROM images WHERE "productId" = '${productId}'`
  );
  await queryInterface.sequelize.query(
    `DELETE FROM products WHERE id = '${productId}'`
  );
}
