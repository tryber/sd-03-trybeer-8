const connection = require('./connection');

const checkoutSales = async (id, total, address, number, date, status) => connection()
  .then((db) => db
    .getTable('sales')
    .insert(['user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
    .values(id, total, address, number, date, status)
    .execute());

module.exports = {
  checkoutSales,
};
