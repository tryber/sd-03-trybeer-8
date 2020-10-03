const { salesModel } = require('../models');

/*
retorna id, total_price, delivery_address, delivery_number, sale_date, status por padrão
é Pendente mas também pode ser Entregue
*/
const checkoutSales = async (id, total, address, number, date, status = 'Pendente', productId, quantity) => {
  const sale = await salesModel.postSale(id, total, address, number, date, status);
  console.log(sale);
  await salesModel.postSaleProducts(productId, quantity);
  return { id, total, address, number, date, status, productId, quantity };
};

module.exports = {
  checkoutSales,
};
