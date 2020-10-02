import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../utils/utils';
import { ProductsContext } from '../contexts/ProductsContext';

const ProductCard = ({
  index,
  id,
  name,
  price,
  urlImage,
  quantity,
}) => {
  const { addQuantity, subQuantity } = useContext(ProductsContext);

  console.log(quantity);

  return (
    <div className="product-card">
      <p data-testid={`${index}-product-price`} className="price">
        {formatPrice(price)}
      </p>
      <div className="product-image">
        <img data-testid={`${index}-product-img`} src={urlImage} alt={name} />
      </div>
      <p data-testid={`${index}-product-name`} className="product-name">
        {name}
      </p>
      <button type="button" onClick={() => addQuantity(id)}>
        add
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={() => subQuantity(id)}>
        sub
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
