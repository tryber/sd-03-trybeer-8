const { userModel } = require('../models');

const editUser = async (name, email) => {
  await userModel.editUser(name, email);

  const user = await userModel.getUserByEmail(email);

  if (user.email !== email) return { message: 'Invalid email' };

  return { name, email };
};

module.exports = { editUser };
