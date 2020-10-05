import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AdminMenu from '../components/AdminMenu';
import { OrdersContext } from '../contexts/OrdersContext';
import AdminOrderCard from '../components/AdminOrderCard';

const AdminOrders = () => {
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
      <AdminMenu />
      {orders.map((order, index) => <AdminOrderCard key={ order.id } order={ order } index={ index } />)}
    </div>
  );
};

export default AdminOrders;
