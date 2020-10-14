import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignupPage from './pages/Login/Register';
import Login from './pages/Login/Login';
import UserProfile from './pages/User/UserProfile';
import Products from './pages/User/Products';
import ProductsProvider from './contexts/ProductsContext';
import OrdersProvider from './contexts/OrdersContext';
import Checkout from './pages/User/Checkout';
import MyOrders from './pages/User/MyOrders';
import OrderDetails from './pages/User/OrderDetails';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminProfile from './pages/Admin/AdminProfile';
import AdminOrderDetails from './pages/Admin/AdminOrderDetails';

function App() {
  return (
    <Router>
      <ProductsProvider>
        <Switch>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </ProductsProvider>
      <OrdersProvider>
        <Switch>
          <Route exact path="/orders">
            <MyOrders />
          </Route>
          <Route exact path="/orders/:id">
            <OrderDetails />
          </Route>
          <Route exact path="/admin/orders/:id">
            <AdminOrderDetails />
          </Route>
          <Route exact path="/admin/orders">
            <AdminOrders />
          </Route>
        </Switch>
      </OrdersProvider>
      <Switch>
        <Route exact path="/register">
          <SignupPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/profile">
          <UserProfile />
        </Route>
        <Route exact path="/admin/profile">
          <AdminProfile />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
