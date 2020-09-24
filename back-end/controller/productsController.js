const { Router } = require('express');
const rescue = require('express-rescue');
const services = require('../services');

const productsRouter = Router();

const getAll = rescue(async (_req, res) => {
  const products = await services.product.getAll();
  return res.status(200).json(products);
});

productsRouter.route('/').get(getAll);

module.exports = productsRouter;
