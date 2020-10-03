const { Router } = require('express');
const rescue = require('express-rescue');
const { salesService } = require('../services');
const { validateJWT } = require('../middlewares/auth');

const saleRouter = Router();

const checkoutSales = rescue(async (req, res, next) => {
  const { total, address, number, status, productId, quantity } = req.body;
  const { id } = req.user;
  const date = new Date();
  const saleDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const checkoutedSale = await salesService.checkoutSales(
    id,
    total,
    address,
    number,
    saleDate,
    status,
    productId,
    quantity,
  );

  if (checkoutedSale.message) {
    return next(checkoutedSale);
  }

  res.status(200).json(checkoutedSale);
});

saleRouter.route('/').post(validateJWT, checkoutSales);

module.exports = saleRouter;
