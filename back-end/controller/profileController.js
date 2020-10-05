const { Router } = require('express');
const rescue = require('express-rescue');
const { profileService } = require('../services');
const { validateJWT } = require('../middlewares/auth');

const profileRouter = Router();

const editUser = rescue(async (req, res, next) => {
  const { name, email } = req.body;

  const editedUser = await profileService.editUser(name, email);

  if (editedUser.message) {
    return next(editedUser);
  }

<<<<<<< HEAD
  // const { id, password: usersecret, ...user } = editedUser;
  // const userWithToken = { ...user, token };

=======
>>>>>>> 0378fcaab498d5de67deb09d5667e8fdacb12024
  res.status(200).json(editedUser);
});

profileRouter.route('/').put(validateJWT, editUser);

module.exports = profileRouter;
