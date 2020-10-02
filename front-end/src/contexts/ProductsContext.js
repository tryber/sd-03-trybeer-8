import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import requestAPI from '../services/backEndAPI';

export const ProductsContext = createContext(null);

ProductsContext.displayName = 'ProductsContext';

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user')) || {};
      const response = await requestAPI('GET', '/products', null, token);
      const responseQuantity = response.data.map((product) => {
        const newProduct = product;
        newProduct.quantity = 0;
        return newProduct;
      });
      setProducts(responseQuantity);
    } catch (e) {
      console.log(e.message);
    }
  };

  const addQuantity = (id) => {
    const newProducts = products;
    const index = newProducts.findIndex((product) => product.id === id);
    newProducts[index].quantity += 1;
    setProducts(newProducts);
  };

  const subQuantity = (id) => {
    const newProducts = products;
    const zero = 0;
    const index = newProducts.findIndex((product) => product.id === id);
    if (newProducts[index].quantity > zero) newProducts[index].quantity -= 1;
    setProducts(newProducts);
  };

  const context = {
    products,
    getProducts,
    addQuantity,
    subQuantity,
  };

  return <ProductsContext.Provider value={ context }>{children}</ProductsContext.Provider>;
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductsProvider;
