import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignupPage from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Products from './pages/Products';
import ProductsProvider from './contexts/ProductsContext';
import OrdersProvider from './contexts/OrdersContext';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register">
          <SignupPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
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
        </Switch>
      </OrdersProvider>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
