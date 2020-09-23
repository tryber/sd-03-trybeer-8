require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const { userController } = require('./controller');
const { errorHandler } = require('./middlewares/errorHandle');

const app = express();
app.use(bodyParser.json());

app.use('/register', userController);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
