/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuidv4 } from 'uuid';
import { userServices, userProfileServices } from '../../services';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const user = await userServices.getUserByEmail('testing@example.com');
  const userDetails = await userProfileServices.getUserProfilesById(
    user.dataValues.id
  );
  if (user && !userDetails) {
    await queryInterface.bulkInsert('user_profile_data', [
      {
        id: uuidv4(),
        userId: user.dataValues.id,
        names: 'John doe',
        gender: 'male',
        birthdate: '2003-12-31',
        language: 'es',
        city: 'kigali',
        street: 'KS street01',
        currency: 'FRW',
        postalCode: '00000',
        country: 'Country',
        accountNumber: '129010328',
        accountName: 'BK',
        telephone: '848387485',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
export async function down(queryInterface) {
  await queryInterface.bulkDelete('user_profile_data', null, {});
}
