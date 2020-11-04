import React, { useEffect, useContext } from 'react';
import { OrdersContext } from '../../contexts/OrdersContext';
import Auth from '../../utils/Auth';
import Header from '../../components/MenuTop';
import OrderCard from './components/OrderCard';

const MyOrders = () => {
  const { orders, getOrders } = useContext(OrdersContext);

  useEffect(() => {
    getOrders();
  }, []);

  if (orders.length === 0) return <span>Loading</span>;
  return (
    <Auth>
      <Header title="Meus Pedidos" />
      {orders.map((order, index) => <OrderCard key={ order.id } order={ order } index={ index } />)}
    </Auth>
  );
};

export default MyOrders;
