import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import { formatPrice, calculateTotalPrice } from '../utils/utils';

const zero = 0;

const ShoppingCartButton = () => {
  const { quantities } = useContext(ProductsContext);

  const products = (JSON.parse(localStorage.getItem('products')) || [])
    .map((product, i) => ({
      ...product,
      quantity: quantities[i],
    }));

  return quantities.length > zero
    ? (
      <div className="shopping-cart-button">
        <a href="/checkout">
          <button
            type="submit"
            data-testid="checkout-bottom-btn"
          >
            <div className="button-content">
              <div>Ver carrinho</div>
              <div data-testid="checkout-bottom-btn-value">
                {/* formatPrice(calculateTotalPrice(products))*/}
              </div>
            </div>
          </button>
        </a>
      </div>
    )
    : null;
};

export default ShoppingCartButton;
