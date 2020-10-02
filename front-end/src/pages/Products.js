import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import ProductCard from '../components/ProductCard';
import MenuTop from '../components/MenuTop';
import { idText } from 'typescript';

const zero = 0;

const Products = () => {
  const { products, getProducts } = useContext(ProductsContext);

  useEffect(() => {
    getProducts();
  }, []);

  if (products.length === zero) return <span>loading</span>;
  return (
    <div>
      <MenuTop title="Products" />
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
    </div>
  );
};

export default Products;
