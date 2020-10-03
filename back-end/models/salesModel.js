const connection = require('./connection');

const postSale = async (id, total, address, number, date, status) =>
  connection().then((db) =>
    db
      .getTable('sales')
      .insert([
        'user_id',
        'total_price',
        'delivery_address',
        'delivery_number',
        'sale_date',
        'status',
      ])
      .values(id, total, address, number, date, status)
      .execute(),
  );

const postSaleProducts = async (productId, quantity) =>
  connection().then((db) =>
    db
      .getTable('sales_products')
      .insert(['product_id', 'quantity'])
      .values(productId, quantity)
      .execute(),
  );

module.exports = {
  postSale,
  postSaleProducts,
};
