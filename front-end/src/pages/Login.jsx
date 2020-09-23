import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <input type="text" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <button type="submit" data-testid="signin-btn">Login</button>
      {/* <Link to="/register" data-testid="no-account-btn">Não tenho conta</Link> */}
    </div>
  );
};

export default Login;
