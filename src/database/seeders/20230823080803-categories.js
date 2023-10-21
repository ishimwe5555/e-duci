/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const categoriesToSeed = [
    { name: 'Primary Software' },
    { name: 'Secondary Software' },
    { name: 'University Software' },
    { name: 'Vocation Software' },
    { name: 'Office  and Business' },
  ];

  const promises = categoriesToSeed.map(async (category) => {
    const [result] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM categories WHERE name='${category.name}'
    `);
  
    // eslint-disable-next-line eqeqeq
    if (result[0].count == 0) {
      await queryInterface.bulkInsert('categories', [
        {
          id: uuidv4(),
          name: category.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  });

  await Promise.all(promises);
}

export async function down(queryInterface) {
  const categoriesToDelete = [
    { name: 'Primary Software' },
    { name: 'Secondary Software' },
    { name: 'University Software' },
    { name: 'Vocation Software' },
    { name: 'Office  and Business' },
  ];


  try {
    for (const categoryName of categoriesToDelete) {
      await queryInterface.sequelize.query(
        `DELETE FROM subcategories WHERE name = '${categoryName}'`
      );
    }
    console.log('categories deleted successfully');
  } catch (error) {
    console.error('Error deleting subcategories:', error);
  }
}
