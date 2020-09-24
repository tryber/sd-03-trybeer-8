import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { ProductsContext, ProductsProvider } from '../contexts/ProductsContext';
import ProductCard from '../components/ProductCard';
import ShoppingCartButton from '../components/ShoppingCartButton';

const renderProducts = (products) => (
  <div>
    <div className="cards">
      {products.map(({ name, price, urlImage }, index) => (
        <ProductCard
          index={ index - 1 }
          data={ { name, price, urlImage } }
        />
      ))}
    </div>
    <ShoppingCartButton />
  </div>
);

const Products = () => {
  const {
    products,
    redirect,
  } = useContext(ProductsContext);

  if (redirect) return <Redirect to="/login" />;

  return renderProducts(products);
};

export default () => (
  <ProductsProvider>
    <Products />
  </ProductsProvider>
);
