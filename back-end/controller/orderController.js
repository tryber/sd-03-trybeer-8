const rescue = require('express-rescue');
const { Router } = require('express');
const boom = require('@hapi/boom');
const services = require('../services');

const orderRouter = Router();

const validateAddress = (addressName, addressNumber) => typeof addressName === 'string' && typeof addressNumber === 'string';

const validatePrice = (price) => typeof price === 'number';

const validateProducts = (products) => {
  if (Array.isArray(products)) {
    return products.every(({ productQuantity, productId }) => (
      (productQuantity && typeof productQuantity === 'number')
      && (productId && typeof productId === 'number')
    ));
  }
  return false;
};

const getInvalidDataFromRegister = (addressName, addressNumber, price, products) => {
  const invalidData = [];

  const addressIsValid = validateAddress(addressName, addressNumber);
  if (!addressIsValid) invalidData.push('address');

  const priceIsValid = validatePrice(price);
  if (!priceIsValid) invalidData.push('price');

  const productsIsValid = validateProducts(products);
  if (!productsIsValid) invalidData.push('products');

  return invalidData;
};

const create = rescue(async (req, res, next) => {
  const { addressName, addressNumber, totalPrice, products } = req.body;
  const { id: clientId } = req.user;
  const invalidData = getInvalidDataFromRegister(addressName, addressNumber, totalPrice, products);

  if (invalidData.length > 0) {
    return next(boom.badData('Dados inválidos', invalidData.join(', ')));
  }

  const orderData = await services.order.create({
    addressName, addressNumber, totalPrice, products, clientId });

  res.status(201).json({ orderData });
});

const getAll = rescue(async (req, res) => {
  const { id, role } = req.user;

  const orders = await services.order.getAll({ id, role });

  return res.status(200).json(orders);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const order = await services.order.findById(Number(id));

  return res.status(200).json(order);
});

const update = rescue(async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;

  const updatedOrder = await services.order.update({ role, id: Number(id) });

  return res.status(200).json(updatedOrder);
});

orderRouter.route('/').post(create).put(update).get(getAll);

orderRouter.route('/:id').get(findById);

module.exports = orderRouter;
