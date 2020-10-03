import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ProductsContext } from '../contexts/ProductsContext';
import Header from '../components/MenuTop';
import { formatPrice } from '../utils/utils';

const productLine = ({ quantity, name, price, id }, index, deleteProduct) => (
  <tr>
    <th data-testid={`${index}-product-qtd-input`}>{quantity}</th>
    <th data-testid={`${index}-product-name`}>{name}</th>
    <th data-testid={`${index}-product-total-value`}>{formatPrice(quantity * price)}</th>
    <th data-testid={`${index}-product-unit-price`}>{`(${formatPrice(price)} un)`}</th>
    <th>
      <button
        data-testid={`${index}-removal-button`}
        type="button"
        onClick={() => deleteProduct(id)}
      >
        X
      </button>
    </th>
  </tr>
);
address, products, setMessage, setRedirectTo

const postCheckout = async ({street, number}, products, { email }, setMessage, setRedirectTo) => {
  try {
    const { status } = await axios.post('http://localhost:3001/checkout', {
      email,
      total,
      address: street,
      number,
      status: 'Pendente',
    });
    const statusOk = 200;
    if (status === statusOk) {
      setMessage('Atualização concluída com sucesso');
    }
  } catch (err) {
    setMessage(err.message);
  }
};

const Checkout = () => {
  const { products, cartTotalPrice, deleteProduct } = useContext(ProductsContext);
  const [redirectTo, setRedirectTo] = useState('');
  const [message, setMessage] = useState('');

  const [address, setAddress] = useState({
    street: '',
    number: '',
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) setRedirectTo('/login');
  }, []);

  if (redirectTo) return <Redirect to={ redirectTo } />;

  const onChange = (e) => {
    setAddress({
      ...address,
      [e.name]: e.value,
    });
  };

  const cart = products.reduce((acc, product, index) => {
    if (product.quantity) acc.push(productLine(product, index, deleteProduct));
    return acc;
  }, []);

  return (
    <div>
      <Header title="Finalizar Pedido" />
      <table>{cart.length === 0 ? 'Não há produtos no carrinho' : cart}</table>
      <span data-testid="order-total-value">{formatPrice(cartTotalPrice)}</span>
      <input
        type="text"
        data-testid="checkout-street-input"
        name="street"
        onChange={(e) => onChange(e.target)}
      />
      <input
        type="text"
        data-testid="checkout-house-number-input"
        name="number"
        onChange={(e) => onChange(e.target)}
      />
      <button
        type="button"
        data-testid="checkout-finish-btn"
        onClick={() => postCheckout(address, products, user, setMessage, setRedirectTo)}
        disabled={cart.length === 0 || !address.street || !address.number}
      >
        Finalizar Pedido
      </button>
    </div>
  );
};

export default Checkout;
