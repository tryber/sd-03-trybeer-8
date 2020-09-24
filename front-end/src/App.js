import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <SignupPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;