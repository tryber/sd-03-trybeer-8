require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const { userController, productController, loginController, profileController } = require('./controller');
=======
const { userController, productController, loginController, profileController, saleController } = require('./controller');
>>>>>>> 0378fcaab498d5de67deb09d5667e8fdacb12024
const { errorHandler } = require('./middlewares/errorHandle');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productController);
app.use('/register', userController);
app.use('/login', loginController);
app.use('/profile', profileController);
<<<<<<< HEAD
=======
app.use('/checkout', saleController);
>>>>>>> 0378fcaab498d5de67deb09d5667e8fdacb12024

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
