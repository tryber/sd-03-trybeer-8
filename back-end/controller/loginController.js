const { Router } = require('express');
const rescue = require('express-rescue');
const { userService } = require('../services');

const loginRouter = Router();

const loggedUser = rescue(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.userLogin(email, password);

  if (user.message) {
    return res.status(401).json(user);
  }
  return res.status(200).json(user);
});

loginRouter.route('/').post(loggedUser);

module.exports = loggedUser;
