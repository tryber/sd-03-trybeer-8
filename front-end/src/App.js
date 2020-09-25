import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <SignupPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
