import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ProductsContext } from '../contexts/ProductsContext';

const QuantityHandler = ({ index }) => {
  const { quantities, increaseQuantity, decreaseQuantity } = useContext(ProductsContext);

  const zero = 0;
  const quantity = quantities[index];
  const disabled = quantity === zero;

  const addOne = () => increaseQuantity(index);
  const subtractOne = () => decreaseQuantity(index);

  return (
    <div className="quantity-handler">
      <button
        type="button"
        data-testid={ `${index}-product-minus` }
        disabled={ disabled }
        onClick={ subtractOne }
      >
        -
      </button>
      <p data-testid={ `${index}-product-qtd` }>
        {quantity}
      </p>
      <button
        type="button"
        data-testid={ `${index}-product-plus` }
        onClick={ addOne }
      >
        +
      </button>
    </div>
  );
};

QuantityHandler.propTypes = {
  index: PropTypes.isRequired,
};

export default QuantityHandler;
