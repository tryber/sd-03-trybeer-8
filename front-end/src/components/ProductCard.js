import React from 'react';
import QuantityHandler from '../utils/QuantityHandler';
import { formatPrice } from '../utils/utils';

const ProductCard = ({ index, data: { name, price, urlImage } }) => (
  <div className="product-card">
    <p
      data-testid={ `${index - 1}-product-price` }
      className="price"
    >
      {formatPrice(price)}
    </p>
    <div className="product-image">
      <img
        data-testid={ `${index - 1}-product-img` }
        src={ urlImage }
        alt={ name }
      />
    </div>
    <p
      data-testid={ `${index - 1}-product-name` }
      className="product-name"
    >
      {name}
    </p>
    <QuantityHandler index={ index - 1 } />
  </div>
);

// ProductCard.propTypes = {
//   index: PropTypes.number,
//   data = {
//     name: PropTypes.string,
//     price: PropTypes.number,
//     urlImage: PropTypes.any,
//   }
// };

export default ProductCard;
