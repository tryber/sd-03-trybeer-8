import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const handleProducts = async (products, setProducts, setQuantities, setRedirect) => {
  if (!products || products.length === zero) {
    try {
      const { token } = JSON.parse(localStorage.getItem('user')) || {};
      const { data: products1 } = await requestAPI('GET', '/products', null, token);
      const quantities = getInitialQuantities(products);
      setProducts(products1);
      setQuantities(quantities);
    } catch (e) {
      setRedirect(true);
    }
  }
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

ProductsContext.displayName = 'ProductsContext';

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState(getInitialQuantities(products));
  const [redirect, setRedirect] = useState(false);

  const storeQuantities = (quantities1) => handleLocalStorage(quantities1);

  const loadProducts = async () => handleProducts(
    products,
    setProducts,
    setQuantities,
    setRedirect,
  );

  const increaseQuantity = (productIndex) => updateQuantities(quantities, setQuantities, productIndex, 'increase');

  const decreaseQuantity = (productIndex) => updateQuantities(quantities, setQuantities, productIndex, 'decrease');

  useEffect(
    () => {
      storeQuantities(quantities);
    },
  );
  const getProducts = async () => {
    if (!products || products.length === zero) {
      try {
        const { token } = JSON.parse(localStorage.getItem('user')) || {};
        const response = await requestAPI('GET', '/products', null, token);
        setProducts(response.data);
        // setQuantities(quantities);
      } catch (e) {
        setRedirect(true);
      }
    }
  };

  const context = {
    products,
    loadProducts,
    quantities,
    increaseQuantity,
    decreaseQuantity,
    getProducts,
    redirect,
  };

  return (
    <ProductsContext.Provider value={ context }>
      {children}
    </ProductsContext.Provider>
  );
};

ProductsContext.propTypes = {
  children: PropTypes.isRequired,
};

export { ProductsContext, ProductsProvider };
