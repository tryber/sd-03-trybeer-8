import React from 'react';
// import QuantityHandler from '../utils/QuantityHandler';
import { formatPrice } from '../utils/utils';
import PropTypes from 'prop-types';

const ProductCard = ({ index, data: { name, price, urlImage } }) => (
  <div className="product-card">
    <p
      data-testid={ `${index}-product-price` }
      className="price"
    >
      {formatPrice(price)}
    </p>
    <div className="product-image">
      <img
        data-testid={ `${index}-product-img` }
        src={ urlImage }
        alt={ name }
      />
    </div>
    <p
      data-testid={ `${index}-product-name` }
      className="product-name"
    >
      {name}
    </p>
  </div>
);
// <QuantityHandler index={ index } />

// ProductCard.propTypes = {
//   index: PropTypes.number,
//   data = {
//     name: PropTypes.string,
//     price: PropTypes.number,
//     urlImage: PropTypes.string,
//   }
// };

export default ProductCard;