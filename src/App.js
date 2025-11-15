import React, { useState } from "react";
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";

import Footer from "./Components/Footer.js";
import Home from './Pages/Home.js';
import NotFound from './Pages/NotFound.js';
import Sobre from './Pages/Sobre.js';
import Header from "./Components/Header/Header.js";
import Modulos from './Pages/Modulos.js';
import { Playbacks } from './Pages/Playbacks.js';
import { Exercicios } from './Pages/Exercicios.js';
import { Teclado} from './Components/Teclado.js';
import { TecladoNotas} from './Pages/TecladoNotas.js';
import { TecladoAcordes} from './Pages/TecladoAcordes.js';
import Login from './Pages/Login.js';

import { M1A1, M1A2, M1A3, M1A4, M1A5, M1A6, M1A7 } from './Pages/Modulo1.js';
import { M2A1, M2A2, M2A3, M2A4, M2A5} from './Pages/Modulo2.js';
import { M3A1, M3A2, M3A3} from './Pages/Modulo3.js';

export default function App() {
  const [autenticado, setAutenticado] = useState(() => {
    return localStorage.getItem("autenticado") === "true";
  });

  const [nomeUsuario, setNomeUsuario] = useState(() => {
    try {
      const raw = localStorage.getItem('usuario_logado');
      if (raw) return JSON.parse(raw).nome || '';
    } catch (err) {
      return '';
    }
    return '';
  });

  function login(nome) {
    setAutenticado(true);
    localStorage.setItem("autenticado", "true");
    try {
      localStorage.setItem('usuario_logado', JSON.stringify({ nome }));
    } catch (err) {
      // ignore
    }
    setNomeUsuario(nome || '');
  }

  function logout() {
    setAutenticado(false);
    localStorage.removeItem("autenticado");
    localStorage.removeItem('usuario_logado');
    setNomeUsuario('');
  }

  function RotaProtegida({ children }) {
    return autenticado ? children : <Navigate to="/login" />;
  }

  return (
    <HashRouter>
  <Header autenticado={autenticado} onLogout={logout} nomeUsuario={nomeUsuario} />
      <main>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login onLogin={login} />} />

          {/* Privadas */}
          <Route path="/modulos" element={<RotaProtegida><Modulos /></RotaProtegida>} />
          <Route path="/playbacks" element={<RotaProtegida><Playbacks /></RotaProtegida>} />
          <Route path="/exercicios" element={<RotaProtegida><Exercicios /></RotaProtegida>} />
          <Route path="/teclado/escalas" element={<RotaProtegida><Teclado/></RotaProtegida>} />
          <Route path="/teclado/notas" element={<RotaProtegida><TecladoNotas /></RotaProtegida>} />
          <Route path="/teclado/acordes" element={<RotaProtegida><TecladoAcordes /></RotaProtegida>} />

          <Route path="/modulo-1/aula-1" element={<RotaProtegida><M1A1 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-2" element={<RotaProtegida><M1A2 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-3" element={<RotaProtegida><M1A3 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-4" element={<RotaProtegida><M1A4 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-5" element={<RotaProtegida><M1A5 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-6" element={<RotaProtegida><M1A6 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-7" element={<RotaProtegida><M1A7 /></RotaProtegida>} />

          <Route path="/modulo-2/aula-1" element={<RotaProtegida><M2A1 /></RotaProtegida>} />
          <Route path="/modulo-2/aula-2" element={<RotaProtegida><M2A2 /></RotaProtegida>} />
          <Route path="/modulo-2/aula-3" element={<RotaProtegida><M2A3 /></RotaProtegida>} />
          <Route path="/modulo-2/aula-4" element={<RotaProtegida><M2A4 /></RotaProtegida>} />
          <Route path="/modulo-2/aula-5" element={<RotaProtegida><M2A5 /></RotaProtegida>} />

          <Route path="/modulo-3/aula-1" element={<RotaProtegida><M3A1 /></RotaProtegida>} />
          <Route path="/modulo-3/aula-2" element={<RotaProtegida><M3A2 /></RotaProtegida>} />
          <Route path="/modulo-3/aula-3" element={<RotaProtegida><M3A3 /></RotaProtegida>} />

          {/* Qualquer rota inválida leva para NotFound, mas protegida também */}
          <Route path="*" element={
            autenticado ? <NotFound /> : <Navigate to="/login" />
          } />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
