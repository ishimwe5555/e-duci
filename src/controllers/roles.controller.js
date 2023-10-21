import { userServices } from '../services';

const assignRole = async (req, res) => {
  const { userId } = req.params;
  const user = await userServices.getUserById(userId);
  user.role = req.body.role;
  await user.save();
  const upduser = await userServices.getUserById(userId);

  res.status(201).json({
    code: 201,
    message: 'Role updated',
    role: upduser.role,
  });
};

export default assignRole;
