import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/MenuTop';
import OrderCard from '../components/OrderCard';

const getOrders = async (setOrders) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    const { data, status } = await axios({
      method: 'GET',
      url: 'http://localhost:3001/sales',
      headers: { Authorization: token },
    });
    const statusOk = 200;
    if (status === statusOk) {
      setOrders(data.sales);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [redirectTo, setRedirectTo] = useState('');
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) setRedirectTo('/login');
    getOrders(setOrders);
  }, []);

  if (redirectTo) return <Redirect to={ redirectTo } />;
  if (orders.length === 0) return <span>Loading</span>;
  console.log(orders);
  return (
    <div>
      <Header title="Meus Pedidos" />
      {orders.map((order, index) => <OrderCard key={ order.id } order={ order } index={ index } />)}
    </div>
  );
};

export default MyOrders;
