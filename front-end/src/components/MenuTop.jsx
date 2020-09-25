import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../style/MenuTop.css';

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
    <label htmlFor="hamburguer-input">
      <div className="menu">
        <span className="hamburguer" />
      </div>
    </label>

    {isMenuActive ? (<ul className="btn-list">
      <li>
        <button type="button" className="menu-btn">
          Produtos
        </button>
      </li>
      <li>
        <button type="button" className="menu-btn">
          Meus Pedidos
        </button>
      </li>
      <li>
        <button type="button" className="menu-btn">
          Meu Perfil
        </button>
      </li>
      <li>
        <button type="button" className="menu-btn">
          Sair
        </button>
      </li>
    </ul>) : ''}
  </div>
)};

MenuTop.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MenuTop;
