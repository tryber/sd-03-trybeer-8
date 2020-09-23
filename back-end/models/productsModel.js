const getSession = require('./connection');

const getTable = async (table) => (
  getSession()
    .then((session) => session.getSchema('Trybeer'))
    .then((db) => db.getTable(table))
);

const getAll = async () => (
  getTable('products')
    .then((table) => table.select(['id', 'name', 'unit_price', 'image_url']).execute())
    .then((results) => results.fetchAll())
    .then((products) => (
      products.map(([id, name, unitPrice, imageUrl]) => ({
        id,
        name,
        unitPrice,
        imageUrl,
      }))
    ))
);

const findById = async (id) => (
  getAll()
    .then((products) => products
      .find((product) => product.id === id))
);

module.exports = {
  getAll,
  findById,
};
