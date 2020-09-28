const { userModel, salesModel } = require('../models');

/*
retorna id, total_price, delivery_address, delivery_number, sale_date, status por padrão
é Pendente mas também pode ser Entregue
*/
const checkoutSales = async (email, total, address, number, date, status = 'Pendente') => {
  const { id } = await userModel.getUserByEmail(email);

  await salesModel.checkoutSales(id, total, address, number, date, status);

  return { id, total, address, number, date, status };
};

module.exports = {
  checkoutSales,
};
