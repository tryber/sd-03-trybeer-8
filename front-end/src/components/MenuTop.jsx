import React from 'react';
import '../style/MenuTop.css';

const MenuTop = () => {
  return (
    <div className="menu-top">
      <h1 className="app-name" data-testid="top-title">
        Trybeer
      </h1>
      <input id="hamburguer-input" className="hamburguer-input" type="checkbox" />
      <label htmlFor="hamburguer-input">
        <div className="menu">
          <span className="hamburguer"></span>
        </div>
      </label>

      <ul className="btn-list">
        <li><button type="button" className="menu-btn">Produtos</button></li>
        <li><button type="button" className="menu-btn">Meus Pedidos</button></li>
        <li><button type="button" className="menu-btn">Meu Perfil</button></li>
        <li><button type="button" className="menu-btn">Sair</button></li>
      </ul>
    </div>
  );
};

export default MenuTop;
