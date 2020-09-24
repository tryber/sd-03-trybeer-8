import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Products from './pages/Products';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/products" component={ Products } />
    </Switch>
  </BrowserRouter>
);

export default App;
