import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const postLogin = async (email, password, setErrorMessage) => {
  try {
    const {
      data: { token },
      status,
    } = await axios.post('http://localhost:3001/login', {
      email,
      password,
    });
    const statusOk = 200;
    if (status === statusOk) {
      localStorage.setItem('token', token);
    }
  } catch (err) {
    setErrorMessage(err.message);
  }
};

const regexEmail = /\S+@\w+\.\w{2,6}(\.\w{2})?/;
const regexPassword = /\d{6,}/;

const validateInputs = (state) => {
  const { email, password } = state;
  const response = {
    btnIsDisabled: false,
    emailMessage: '',
    passwordMessage: '',
  };
  if (email !== '' && !regexEmail.test(email)) {
    response.emailMessage = 'email is not valid';
    response.btnIsDisabled = true;
  }
  if (password !== '' && !regexPassword.test(password)) {
    response.passwordMessage = 'password is not valid';
    response.btnIsDisabled = true;
  }
  return response;
};

const Login = () => {
  const [inputsValues, setInputsValues] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputsValues;
  const [validations, setValidations] = useState({
    btnIsDisabled: true,
    emailMessage: '',
    passwordMessage: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { btnIsDisabled, emailMessage, passwordMessage } = validations;
  const onChange = (e) => {
    const newState = { ...inputsValues, [e.name]: e.value };
    setInputsValues(newState);
    setValidations(validateInputs(newState));
  };
  return (
    <form>
      <input
        type="text"
        data-testid="email-input"
        name="email"
        value={ email }
        onChange={ (e) => onChange(e.target) }
      />
      <span>{emailMessage}</span>
      <input
        type="password"
        data-testid="password-input"
        name="password"
        value={ password }
        onChange={ (e) => onChange(e.target) }
      />
      <span>{passwordMessage}</span>
      <button
        disabled={ btnIsDisabled }
        type="button"
        data-testid="signin-btn"
        onClick={ () => postLogin(email, password, setErrorMessage) }
      >
        Login
      </button>
      <span>{errorMessage}</span>
      {/* <Link to="/register" data-testid="no-account-btn">Não tenho conta</Link> */}
    </form>
  );
};

export default Login;
