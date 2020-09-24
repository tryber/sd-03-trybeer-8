import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';

const QuantityHandler = ({ index }) => {
  const { quantities, increaseQuantity, decreaseQuantity } = useContext(ProductsContext);

  const zero = 0;
  const quantity = quantities[index - 1];
  const disabled = quantity === zero;

  const addOne = () => increaseQuantity(index - 1);
  const subtractOne = () => decreaseQuantity(index - 1);

  return (
    <div className="quantity-handler">
      <button
        type="button"
        data-testid={ `${index - 1}-product-minus` }
        disabled={ disabled }
        onClick={ subtractOne }
      >
        -
      </button>
      <p data-testid={ `${index - 1}-product-qtd` }>
        {quantity}
      </p>
      <button
        type="button"
        data-testid={ `${index - 1}-product-plus` }
        onClick={ addOne }
      >
        +
      </button>
    </div>
  );
};

// QuantityHandler.propTypes = {
//   index: PropTypes.number,
// };

export default QuantityHandler;
