const { Router } = require('express');
const rescue = require('express-rescue');
const { saleService } = require('../services');

const saleRouter = Router();

const checkoutSales = rescue(async (req, res, next) => {
  const { email, total, address, number, date, status } = req.body;
  const checkoutedSale = await saleService.checkoutSales(
    email,
    total,
    address,
    number,
    date,
    status,
  );

  if (checkoutedSale.message) {
    return next(checkoutedSale);
  }

  res.status(200).json(checkoutedSale);
});

saleRouter.route('/').post(checkoutSales);

module.exports = saleRouter;
