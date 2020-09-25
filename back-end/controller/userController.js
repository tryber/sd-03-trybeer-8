const { Router } = require('express');
const rescue = require('express-rescue');
const { userService } = require('../services');
const { validateJWT } = require('../middlewares/auth');

const usersRouter = Router();

const NewUser = rescue(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const registeredUser = await userService.registerUser(name, email, password, role);

  if (registeredUser.message) {
    return next(registeredUser);
  }

  return res.status(201).json(registeredUser);
});

usersRouter.route('/').post(NewUser);

module.exports = usersRouter;
