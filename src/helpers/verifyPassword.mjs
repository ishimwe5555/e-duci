import bcrypt from 'bcrypt';
import { userServices } from '../services';

const { compare } = bcrypt;
// Verify if user's old password is correct before updating a password
async function verifyOldPassword(id, oldPassword) {
  const user = await userServices.getUserById(id);
  const passwordMatches = await compare(oldPassword, user.password);
  return passwordMatches;
}

export default verifyOldPassword;
