import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ProductsContext } from '../../contexts/ProductsContext';
import ProductCard from './components/ProductCard';
import MenuTop from '../../components/MenuTop';
import { formatPrice } from '../../utils/utils';
import CardsContainer from './styles/CardsContainer';
import ProductsFooter from './styles/ProductsFooter';
import ProductsSkeleton from './components/ProductsSkeleton';

const zero = 0;

const Products = () => {
  const { products, cartTotalPrice, message } = useContext(ProductsContext);
  const [redirectTo, setRedirectTo] = useState('');

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) setRedirectTo('/login');
  }, []);

  if (redirectTo) return <Redirect to={redirectTo} />;
  if (!products || products.length === zero) return <ProductsSkeleton />;
  return (
    <div>
      <MenuTop title="TryBeer" />
      <CardsContainer>
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
      </CardsContainer>
      <ProductsFooter>
        <Link to="/checkout">
          <button type="button" data-testid="checkout-bottom-btn" disabled={!cartTotalPrice}>
            Ver Carrinho
          </button>
        </Link>
        <span data-testid="checkout-bottom-btn-value">Preço total: {formatPrice(cartTotalPrice)}</span>
        <span>{message}</span>
      </ProductsFooter>
    </div>
  );
};

export default Products;
