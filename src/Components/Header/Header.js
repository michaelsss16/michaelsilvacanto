import React, { useState, useEffect } from "react"; 
import { Link, NavLink, useLocation } from "react-router-dom"; 
import './Header.css';

const Header = ({ autenticado, onLogout, nomeUsuario }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [submenuTecladoAberto, setSubmenuTecladoAberto] = useState(false);

  // 2. Obter o objeto de localização atual da rota
  const location = useLocation();

  // 3. Efeito que executa sempre que a rota (location) muda
  useEffect(() => {
    // Fecha ambos os menus em qualquer mudança de navegação
    setMenuAberto(false);
    setSubmenuTecladoAberto(false);
  }, [location]); // A dependência do efeito é o objeto 'location'

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
    // Se o menu principal está sendo aberto, garante que o submenu esteja fechado
    if (!menuAberto) {
        setSubmenuTecladoAberto(false);
    }
  };

  const toggleSubmenuTeclado = (event) => {
    // Impede que o clique no submenu feche o menu principal em mobile
    event.stopPropagation(); 
    setSubmenuTecladoAberto(!submenuTecladoAberto);
  };

  return (
    <header role="banner" className="header">
      <div className="header-container">
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
            <li><NavLink to="/" end>Início</NavLink></li>
            <li><NavLink to="/modulos">Aulas</NavLink></li>
            <li><NavLink to="/exercicios">Exercícios</NavLink></li>
            <li><NavLink to="/playbacks">Playbacks</NavLink></li>
            
            <li className="submenu">
              <button
                className="submenu-toggle"
                onClick={toggleSubmenuTeclado}
                aria-expanded={submenuTecladoAberto}
                aria-controls="submenu-teclado"
              >
                Teclado {submenuTecladoAberto ? '▲' : '▼'}
              </button>
              {/* O uso de renderização condicional é mais limpo que a prop 'hidden' */}
              {submenuTecladoAberto && (
                <ul
                  id="submenu-teclado"
                  className="submenu-list aberto"
                  aria-label="Submenu Teclado"
                >
                  <li><NavLink to="/teclado/notas">Notas</NavLink></li>
                  <li><NavLink to="/teclado/acordes">Acordes</NavLink></li>
                  <li><NavLink to="/teclado/escalas">Escalas</NavLink></li>
                </ul>
              )}
            </li>

            <li><NavLink to="/contato">Contato</NavLink></li>
            <li><NavLink to="/sobre">Sobre</NavLink></li>
          </ul>
        </nav>

        <div className="auth-links">
          {!autenticado && <Link to="/login" className="login-link">Login</Link>}
          {autenticado && (
            <div className="user-area" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              {nomeUsuario && <span className="user-name">{nomeUsuario}</span>}
              <button onClick={onLogout} className="logout-button">Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;