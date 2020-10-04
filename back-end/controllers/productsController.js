const rescue = require('express-rescue');
const services = require('../services');

const getAll = rescue(async (_req, res) => {
  const products = await services.product.getAll();
  return res.status(200).json(products);
});

module.exports = { getAll };
