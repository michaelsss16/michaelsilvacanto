import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header role="banner">
      <nav aria-label="Menu principal">
        <div>
          <Link to="/">Início</Link> <br></br>
          <Link to="/sobre">Sobre</Link><br></br>
          <Link to="/modulos">Conteúdo</Link><br></br>
          <div>
            <button
              onClick={toggleMenu}
              aria-expanded={menuAberto}
              aria-controls="submenu-modulos"
            >
              Módulos
            </button>
            {menuAberto && (
              <div id="submenu-modulos" role="menu">
                <Link to="/modulos/1" role="menuitem">Respiração e Apoio</Link><br />
                <Link to="/modulos/2" role="menuitem">Vocalises e Aquecimento</Link><br />
                <Link to="/modulos/3" role="menuitem">Afinação e Timbre</Link><br />
                <Link to="/modulos/4" role="menuitem">Projeção Vocal e Potência</Link><br />
                <Link to="/modulos/5" role="menuitem">Teoria Musical Básica</Link><br />
              </div>
            )}
          </div>
          <Link to="/depoimentos">Depoimentos</Link><br />
          <Link to="/contato">Contato</Link><br />
        </div>
      </nav>
    </header>
  );
};

export default Header;
