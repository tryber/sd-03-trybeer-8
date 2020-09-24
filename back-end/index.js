require('dotenv').config();
const { userController, productController, loginController } = require('./controller');
const { errorHandler } = require('./middlewares/errorHandle');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productController);

app.use('/register', userController);
app.use('/login', loginController);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
