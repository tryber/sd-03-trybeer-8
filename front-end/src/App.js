import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignupPage from './pages/Register';
import Login from './pages/Login';
//import AdminProfile from './pages/AdminProfile';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <SignupPage />
        </Route>
        <Route path="/">
          <HomePage />
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