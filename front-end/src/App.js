import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
import HomePage from './pages/HomePage';
import SignupPage from './pages/Register';
=======
import SignupPage from './pages/Register';
import Login from './pages/Login';
>>>>>>> 416142b399cfbe8cfa42e8b35cba3b04317dd319

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <SignupPage />
        </Route>
<<<<<<< HEAD
        <Route path="/">
          <HomePage />
=======
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Login />
>>>>>>> 416142b399cfbe8cfa42e8b35cba3b04317dd319
        </Route>
      </Switch>
    </Router>
  );
}

export default App;