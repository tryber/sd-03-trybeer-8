require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const { userController, loginController } = require('./controller');
const { errorHandler } = require('./middlewares/errorHandle');

const app = express();
app.use(bodyParser.json());

app.use('/register', userController);
app.use('/login', loginController);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
