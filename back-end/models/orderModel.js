const connection = require('./connection');

const updateTable = async (tableName, id, newPropName, newPropValue) => (
  connection()
    .then((db) => db
      .getTable(tableName)
      .update()
      .where('id = :id')
      .bind('id', id)
      .set(newPropName, newPropValue)
      .execute(),
    )
);

const getSalesWithoutProducts = async () => (
  connection()
    .then((db) => db
      .getTable('sales')
      .select(['user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
      .execute(),
    )
    .then((results) => results.fetchAll())
    .then((orders) => (
      orders.map(([id, address, total, date, status, userId]) => ({
        id,
        address,
        total,
        date,
        status,
        userId,
      }))
    ))
);

const getProductsForEachSale = async (ids) => (
  Promise.all(ids.map((id) =>
    getSession()
      .then((session) =>
        session
          .sql(
            `SELECT 
            sp.product_id, 
            sp.quantity, 
            (SELECT p.name FROM Trybeer.products p WHERE sp.product_id = p.id),
            (SELECT p.price FROM Trybeer.products p WHERE sp.product_id = p.id),
            (SELECT p.price * sp.quantity FROM Trybeer.products p WHERE sp.product_id = p.id)
            FROM
            Trybeer.sales_products sp
            WHERE
            order_id = ?;`
          )
          .bind(id)
          .execute(),
      )
      .then((results) => results.fetchAll())
      .then((products) => products.map(([
        productId,
        quantity,
        name,
        price,
        totalProductPrice,
      ]) => ({
        productId,
        quantity,
        name,
        price,
        totalProductPrice,
      }))),
  ))
);

const getAll = async () => {
  const salesWithoutProducts = await getSalesWithoutProducts();
  const ids = salesWithoutProducts.map(({ id }) => id);
  const productsForEachSale = await getProductsForEachSale(ids);

  return salesWithoutProducts.map((sale, i) => ({
    ...sale,
    products: productsForEachSale[i],
  }));
};

const getByUserId = async (userId) => (
  getAll()
    .then((sales) => sales
      .filter((sale) => sale.userId === userId),
    )
);

const findById = async (id) => (
  getAll()
    .then((sales) => sales
      .find((sale) => sale.id === id),
    )
);

const insertInSales = async ({ address, totalPrice, userId }) => (
  getTable('sales')
    .then((table) =>
      table
        .insert(['address', 'total_price', 'user_id'])
        .values(address, totalPrice, userId)
        .execute(),
    )
    .then(async ({ getAutoIncrementValue }) =>
      findById(getAutoIncrementValue()),
    )
);

const insertInSalesProduct = async ({ saleId, products }) => (
  products.map(async ({ productId, quantity }) =>
    getTable('sales_products')
      .then((table) =>
        table
          .insert(['sale_id', 'product_id', 'quantity'])
          .values(saleId, productId, quantity)
          .execute(),
      ),
  )
);

const create = async ({ address, price, userId, products }) => {
  const order = await insertInSales({ address, price, userId });
  await insertInSalesProduct({ saleId: sale.id, products });

  return {
    ...sale,
    products,
  };
};

const update = async (id) => (
  updateTable('sales', id, 'status', 'entregue')
    .then(async () => findById(id))
);

const remove = async (id) => (
  getTable('sales')
    .then((table) =>
      table
        .delete()
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
);

module.exports = {
  getAll,
  getByUserId,
  findById,
  create,
  update,
  remove,
};
