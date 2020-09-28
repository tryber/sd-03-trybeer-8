import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../style/MenuTop.css';
import { Link } from 'react-router-dom';

const MenuTop = ({ title }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  return (
  <div className="menu-top">
    <center>
      <h1 className="app-name" data-testid="top-title">
        {title}
      </h1>
    </center>
    <input id="hamburguer-input" className="hamburguer-input" type="checkbox" onChange={() => setIsMenuActive(!isMenuActive)}/>
    <label data-testid="top-hamburguer" htmlFor="hamburguer-input">
      <div className="menu">
        <span className="hamburguer" />
      </div>
    </label>

    {isMenuActive ? (<ul className="btn-list">
      <li>
        <Link to="/products" className="menu-btn" data-testid="side-menu-item-products">
          Produtos
        </Link>
      </li>
      <li>
        <Link to="/" type="button" className="menu-btn" data-testid="side-menu-item-my-orders">
          Meus Pedidos
        </Link>
      </li>
      <li>
        <Link to="/profile" type="button" className="menu-btn" data-testid="side-menu-item-my-profile">
          Meu Perfil
        </Link>
      </li>
      <li>
        <Link to="/" type="button" className="menu-btn" data-testid="side-menu-item-logout">
          Sair
        </Link>
      </li>
    </ul>) : ''}
  </div>
)};

MenuTop.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MenuTop;
