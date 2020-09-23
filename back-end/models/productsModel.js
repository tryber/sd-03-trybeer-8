const connection = require('./connection');

const getAll = async () => (
  connection()
    .then((db) => db
      .getTable('products')
      .select(['id', 'name', 'price', 'url_image'])
      .execute())
    .then((results) => results.fetchAll())
    .then((products) => (
      products.map(([id, name, price, urlImage]) => ({
        id,
        name,
        price,
        urlImage,
      }))
    ))
);

// const findById = async (id) => (
//   getAll()
//     .then((products) => products
//       .find((product) => product.id === id))
// );

module.exports = {
  getAll,
  // findById,
};
