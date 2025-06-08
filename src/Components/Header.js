import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header role="banner">
      <nav aria-label="Menu principal">
        <div>
          <Link to="/">Início</Link> <br></br>
          <Link to="/modulos">Aulas</Link><br></br>
          <Link to="/playbacks">Playbacks</Link><br />
          <Link to="/contato">Contato</Link><br />
          <Link to="/sobre">Sobre</Link><br></br>
        </div>
      </nav>
    </header>
  );
};

export default Header;
