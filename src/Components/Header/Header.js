import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './Header.css';

const Header = ({ autenticado, onLogout }) => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header role="banner" className="header">
      <div className="header-container">
        {/* Logotipo ou Título do Site */}
        <Link to="/" className="header-logo">

          <h1>MS - Music Space</h1>
        </Link>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-expanded={menuAberto}
          aria-controls="main-navigation"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        >
          ☰ <span className="sr-only">{menuAberto ? "Fechar menu" : "Abrir menu"}</span>
        </button>

        <nav
          aria-label="Menu"
          className={`nav-menu ${menuAberto ? 'aberto' : ''}`}
          id="main-navigation"
        >
          <ul className="nav-list">
            <li><NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>Início</NavLink></li>
            <li><NavLink to="/modulos" className={({ isActive }) => isActive ? "active-link" : ""}>Aulas</NavLink></li>
            <li><NavLink to="/exercicios" className={({ isActive }) => isActive ? "active-link" : ""}>Exercícios</NavLink></li>
            <li><NavLink to="/playbacks" className={({ isActive }) => isActive ? "active-link" : ""}>Playbacks</NavLink></li>
            <li><NavLink to="/teclado" className={({ isActive }) => isActive ? "active-link" : ""}>Teclado</NavLink></li>
            <li><NavLink to="/contato" className={({ isActive }) => isActive ? "active-link" : ""}>Contato</NavLink></li>
            <li><NavLink to="/sobre" className={({ isActive }) => isActive ? "active-link" : ""}>Sobre</NavLink></li>
          </ul>
        </nav>
        {/* Links de Autenticação (Login/Sair) */}
        <div className="auth-links">
          {!autenticado && <Link to="/login" className="login-link">Login</Link>}
          {autenticado && <button onClick={onLogout} className="logout-button">Sair</button>}
        </div>
      </div>
    </header>
  );
};

export default Header;	