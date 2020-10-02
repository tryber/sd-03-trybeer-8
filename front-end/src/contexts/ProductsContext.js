import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import requestAPI from '../services/backEndAPI';

export const ProductsContext = createContext();

ProductsContext.displayName = 'ProductsContext';

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const zero = 0;
  const [cartTotalPrice, setCartTotalPrice] = useState(zero);

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
      localStorage.setItem('products', JSON.stringify(responseQuantity));
    } catch (e) {
      console.log(e.message);
    }
  };

  const sumCartTotalPrice = (cart) => setCartTotalPrice(cart.reduce((acc, product) => acc + (product.price * product.quantity), zero));

  const addQuantity = (id) => {
    const newProducts = products;
    const index = newProducts.findIndex((product) => product.id === id);
    newProducts[index].quantity += 1;
    setProducts([...newProducts]);
    localStorage.setItem('products', JSON.stringify([...newProducts]));
    sumCartTotalPrice([...newProducts]);
  };

  const subQuantity = (id) => {
    const newProducts = products;
    const index = newProducts.findIndex((product) => product.id === id);
    if (newProducts[index].quantity > zero) newProducts[index].quantity -= 1;
    setProducts([...newProducts]);
    localStorage.setItem('products', JSON.stringify([...newProducts]));
    sumCartTotalPrice([...newProducts]);
  };

  const context = {
    products,
    getProducts,
    addQuantity,
    subQuantity,
    setProducts,
    cartTotalPrice,
    sumCartTotalPrice,
  };

  return <ProductsContext.Provider value={ context }>{children}</ProductsContext.Provider>;
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductsProvider;
