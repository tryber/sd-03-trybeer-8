import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { ProductsContext, ProductsProvider } from '../contexts/ProductsContext';
import ProductCard  from '../components/ProductCard';
import MenuTop from '../components/MenuTop';
// import ShoppingCartButton from '../components/ShoppingCartButton';

const zero = 0;
const renderProducts = (products) => (
  <div>
    <MenuTop title="Products" />
    <div className="cards">
      {products.map(({ name, price, urlImage }, index) => (
        <ProductCard key={ name } index={ index } data={ { name, price, urlImage } } />
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
