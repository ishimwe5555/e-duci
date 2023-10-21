import UserProfile from '../database/models/userProfile.model';

async function getUserProfilesById(userId) {
  const userInfo = await UserProfile.findOne({
    where: { userId },
  });
  return userInfo;
}
async function createUserProfiles(data) {
  const userInfo = await UserProfile.create(data);
  return userInfo;
}
async function updateUserProfiles(userId, data) {
  const userInfo = await UserProfile.update(data, {
    where: { userId },
  });
  return userInfo;
}
async function deleteUserProfiles(userId) {
  const newdata = {
    names: '',
    gender: '',
    birthdate: '2000-02-02',
    language: '',
    city: '',
    street: '',
    currency: '',
    postalCode: '',
    country: '',
    accountNumber: '',
    accountName: '',
    telephone: '',
  };
  const nullInfo = await updateUserProfiles(userId, newdata);
  return nullInfo;
}

export default {
  getUserProfilesById,
  createUserProfiles,
  deleteUserProfiles,
  updateUserProfiles,
};
