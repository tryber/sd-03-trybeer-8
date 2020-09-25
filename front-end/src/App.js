import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignupPage from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

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
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
