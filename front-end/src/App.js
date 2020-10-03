import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignupPage from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Products from './pages/Products';
import ProductsProvider from './contexts/ProductsContext';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Switch>
        <ProductsProvider>
          <Route exact path="/register">
            <SignupPage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </ProductsProvider>
      </Switch>
    </Router>
  );
}

export default App;
