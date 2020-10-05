require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { productsRouter, usersRouter, salesRouter } = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/sales', salesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
