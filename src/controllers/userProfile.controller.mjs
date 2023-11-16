import { userServices } from '../services/index.mjs';

const userProfileController = async (req, res) => {
  const userId = req.user.id;
  const {
    names,
    gender,
    birthdate,
    language,
    city,
    street,
    currency,
    postalCode,
    country,
    accountNumber,
    accountName,
    telephone,
  } = req.body;

  const user = await userServices.getUserById(userId);

  let userInfo = await userProfileServices.getUserProfilesById(user.id);

  const dataUpdate = {
    names: names || userInfo.names,
    gender: gender || userInfo.gender,
    birthdate: birthdate || userInfo.birthdate,
    language: language || userInfo.language,
    city: city || userInfo.city,
    street: street || userInfo.street,
    currency: currency || userInfo.currency,
    postalCode: postalCode || userInfo.postalCode,
    country: country || userInfo.country,
    accountNumber: accountNumber || userInfo.accountNumber,
    accountName: accountName || userInfo.accountName,
    telephone: telephone || userInfo.telephone,
  };
  userInfo = await userProfileServices.updateUserProfiles(userId, dataUpdate);
  const info = await userProfileServices.getUserProfilesById(userId);

  return res.status(200).json({
    code: 200,
    message: 'Successfully updated',
    info,
  });
};

const fetchUserController = async (req, res) => {
  const userId = req.user.id;
  const user = await userServices.getUserById(userId);
  const userInfo = await userProfileServices.getUserProfilesById(user.id);
  return res.status(200).json({
    code: 200,
    message: 'Successfully fetched users',
    user,
    profile: userInfo,
  });
};

export { userProfileController, fetchUserController };
