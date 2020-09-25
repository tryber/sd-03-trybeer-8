import React, { createContext, useState } from 'react';
import requestAPI from '../services/backEndAPI';

const zero = 0;

const handleLocalStorage = (quantities) => {
  const storedProducts = (JSON.parse(localStorage.getItem('products')) || [])
    .map(({ id, name, price }, i) => ({
      id,
      name,
      price,
      quantity: quantities[i] || zero,
    }));
  localStorage.setItem('products', JSON.stringify(storedProducts));
};

const getInitialQuantities = (products) => {
  let storedProducts = JSON.parse(localStorage.getItem('products'));

  if (!storedProducts || storedProducts.length === zero) {
    storedProducts = products.map(({ id, name, price }) => ({
      id,
      name,
      price,
      quantity: zero,
    }));
    localStorage.setItem('products', JSON.stringify(storedProducts));
  }

  return storedProducts.map(({ quantity }) => quantity);
};

const updateQuantities = (quantities, setQuantities, productIndex, operation) => {
  const newQuantities = quantities.map((quantity, i) => {
    if (i === productIndex) {
      switch (operation) {
        case 'increase': return quantity + 1;
        case 'decrease': return quantity - 1;
        default: return quantity;
      }
    }
    return quantity;
  });
  setQuantities(newQuantities);
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const products = useState([]);
  const [quantities, setQuantities] = useState(getInitialQuantities(products));
  const redirect = useState(false);

  const storeQuantities = (quantities) => handleLocalStorage(quantities);

  const increaseQuantity = (productIndex) => updateQuantities(quantities, setQuantities, productIndex, 'increase');

  const decreaseQuantity = (productIndex) => updateQuantities(quantities, setQuantities, productIndex, 'decrease');

  const handleProducts = async (setProducts, setRedirect) => {
    if (!products || products.length === zero) {
      try {
        const { token } = JSON.parse(localStorage.getItem('user')) || {};
        await requestAPI('GET', '/products', null, token);
        setProducts(products);
        setQuantities(quantities);
      } catch (e) {
        setRedirect(true);
      }
    }
  };

  const context = {
    products,
    storeQuantities,
    increaseQuantity,
    decreaseQuantity,
    redirect,
  };

  return (
    <ProductsContext.Provider value={ context }>
      { children }
    </ProductsContext.Provider>
  );
};

// ProductsContext.propTypes = {
//   children: PropTypes.func,
// };

export { ProductsContext, ProductsProvider };
