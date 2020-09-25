import React, { useContext, useEffect } from 'react';
<<<<<<< HEAD
// import { Redirect } from 'react-router-dom';
=======
import { Redirect } from 'react-router-dom';
>>>>>>> 9589d720b6220a715490fd96dc4b73488632a8e3
import { ProductsContext, ProductsProvider } from '../contexts/ProductsContext';
import ProductCard  from '../components/ProductCard';
// import ShoppingCartButton from '../components/ShoppingCartButton';

const zero = 0;
const renderProducts = (products) => (
  <div>
    <div className="cards">
      {products.map(({ name, price, urlImage }, index) => (
<<<<<<< HEAD
        <ProductCard key={ name } index={ index } data={ { name, price, urlImage } } />
=======
        <ProductCard key={name} index={index} data={{ name, price, urlImage }} />
>>>>>>> 9589d720b6220a715490fd96dc4b73488632a8e3
      ))}
    </div>
    {/* <ShoppingCartButton /> */}
  </div>
);

const Products = () => {
  const { products, /* redirect, */ getProducts } = useContext(ProductsContext);

  useEffect(() => {
    getProducts();
  });

  // if (redirect) return <Redirect to="/login" />;
  if (products.length === zero) return <span>loading</span>;
  return renderProducts(products);
};

export default () => (
  <ProductsProvider>
    <Products />
  </ProductsProvider>
);
