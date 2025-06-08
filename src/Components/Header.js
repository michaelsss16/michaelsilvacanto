import React from "react";
import { Link } from "react-router-dom";

const Header = ({ autenticado, onLogout }) => {
  return (
    <header role="banner">
      <nav aria-label="Menu principal">
        <div>
          <Link to="/">Início</Link> <br />
          <Link to="/modulos">Aulas</Link><br />
          <Link to="/exercicios">Exercícios</Link><br />
          <Link to="/playbacks">Playbacks</Link><br />
          <Link to="/contato">Contato</Link><br />
          <Link to="/sobre">Sobre</Link><br />
          {!autenticado && <Link to="/login">Login</Link>}<br />
          {autenticado && <button onClick={onLogout}>Sair</button>}
        </div>
      </nav>
    </header>
  );
};

export default Header;
