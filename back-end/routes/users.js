const { Router } = require('express');
const { usersController } = require('../controllers');
const { validateJWT } = require('../middlewares/auth');

const usersRouter = Router();

usersRouter
  .route('/')
  .post(usersController.newUser)
  .put(validateJWT, usersController.editUser)
  .get(usersController.userLogin);

module.exports = usersRouter;
