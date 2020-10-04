import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ProductsContext } from '../contexts/ProductsContext';
import ProductCard from '../components/ProductCard';
import MenuTop from '../components/MenuTop';
import { formatPrice } from '../utils/utils';

const zero = 0;

const Products = () => {
  const { products, cartTotalPrice, message } = useContext(
    ProductsContext,
  );
  const [redirectTo, setRedirectTo] = useState('');

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) setRedirectTo('/login');
  }, []);

  if (redirectTo) return <Redirect to={ redirectTo } />;
  if (!products || products.length === zero) return <span>loading</span>;
  return (
    <div>
      <MenuTop title="TryBeer" />
      <div className="cards">
        {products.map(({ id, name, price, urlImage, quantity }, index) => (
          <ProductCard
            key={id}
            index={index}
            id={id}
            name={name}
            price={price}
            urlImage={urlImage}
            quantity={quantity}
          />
        ))}
      </div>
      <Link to="/checkout">
        <button type="button" data-testid="checkout-bottom-btn" disabled={!cartTotalPrice}>
          Ver Carrinho
        </button>
      </Link>
      <span data-testid="checkout-bottom-btn-value">{formatPrice(cartTotalPrice)}</span>
      <span>{message}</span>
    </div>
  );
};

export default Products;
