import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { OrdersContext } from '../contexts/OrdersContext';
import Header from '../components/MenuTop';
import OrderCard from '../components/OrderCard';

const MyOrders = () => {
  const { orders, getOrders } = useContext(OrdersContext);
  const [redirectTo, setRedirectTo] = useState('');

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) setRedirectTo('/login');
    getOrders();
  }, []);

  if (redirectTo) return <Redirect to={ redirectTo } />;
  if (orders.length === 0) return <span>Loading</span>;
  return (
    <div>
      <Header title="Meus Pedidos" />
      {orders.map((order, index) => <OrderCard key={ order.id } order={ order } index={ index } />)}
    </div>
  );
};

export default MyOrders;
