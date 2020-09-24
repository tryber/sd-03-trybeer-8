import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../style/Register.css';

function Register() {
  const [name, setName] = useState({ text: '', verif: false });
  const [email, setEmail] = useState({ text: '', verif: false });
  const [password, setPassword] = useState({ text: '', verif: false });
  const [seller, setSeller] = useState(false);
  const [activeSubmit, setActiveSubmit] = useState(false);
  const [error, setError] = useState('');
  const [redirectTo, setRedirectTo] = useState('/');

  useEffect(() => {
    if (name.verif && email.verif && password.verif) {
      setActiveSubmit(true);
    } else {
      setActiveSubmit(false);
    }
  }, [name.verif, email.verif, password.verif]);

  function handleNameChange(currentName) {
    const regex = new RegExp(/^[a-zA-Z\s]+$/);
    const minLength = 12;
    let verif = false;
    if (regex.test(currentName) && currentName.length >= minLength) {
      verif = true;
    }
    setName({
      text: currentName,
      verif,
    });
  }

  function handleEmailChange(currentEmail) {
    const regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    let verif = false;
    if (regex.test(currentEmail)) {
      verif = true;
    }
    setEmail({
      text: currentEmail,
      verif,
    });
  }

  function handlePasswordChange(currentPassword) {
    let verif = false;
    const minLength = 6;
    if (currentPassword.length >= minLength) {
      verif = true;
    }
    setPassword({
      text: currentPassword,
      verif,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.text,
        email: email.text,
        password: password.text,
        seller,
      }),
    });
    const user = await response.json();
    const page = user.role === 'administrator' ? '/admin/orders' : '/products';
    if (user.err) setError(user.err.message);
    else setRedirectTo(page);
  }

  if (redirectTo !== '/') return <Redirect to={ redirectTo } />;

  return (
    <div>
      <div className="body">
        <div className="body_form">
          <center>
            <h1 className="text-center">
              TRYBEER
            </h1>
            <h2>REGISTRO DE NOVO USUÁRIO</h2>
            <div className="div_form">
              <form className="form" method="POST" onSubmit={ handleSubmit }>
                <div className="form-group">
                  <label htmlFor="name" className="txt_label">
                    <input
                      data-testid="signup-name"
                      className="ipt_form"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="NOME COMPLETO"
                      onChange={ (e) => handleNameChange(e.target.value) }
                      value={ name.text }
                      required
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="txt_label">
                    <input
                      data-testid="signup-email"
                      className="ipt_form"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="E-MAIL VÁLIDO"
                      onChange={ (e) => handleEmailChange(e.target.value) }
                      value={ email.text }
                      required
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="txt_label">
                    <input
                      data-testid="signup-password"
                      className="ipt_form"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="SENHA"
                      onChange={ (e) => handlePasswordChange(e.target.value) }
                      value={ password.text }
                      required
                    />
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="seller" className="txt_seller">
                    <input
                      data-testid="signup-seller"
                      className="seller"
                      type="checkbox"
                      name="seller"
                      id="seller"
                      onChange={ (e) => setSeller(e.target.checked) }
                      value={ seller }
                    />
                    QUERO VENDER
                  </label>
                </div>
                <div className="div_btn">
                  <input type="submit" value="Registrar" disabled={ !activeSubmit } data-testid="signup-btn" className="btn_ok" />
                </div>
              </form>
            </div>
          </center>
          <p className="text-muted">{error}</p>
        </div>
      </div>
      <div className="footer">TRYBEER 2020</div>
    </div>
  );
}

export default Register;