require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { userController } = require('./controller');
const controllers = require('./controllers');
const { errorHandler } = require('./middlewares/errorHandle');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const productRouter = express.Router();

productRouter
  .get(
    '/',
    controllers.product.getAll,
  );

app.use('/products', productRouter);

app.use('/register', userController);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
