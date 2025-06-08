import React, { useState } from "react";
import { Routes, Route, HashRouter, Navigate, useLocation } from "react-router-dom";

import Footer from "./Components/Footer.js";
import Home from './Pages/Home.js';
import NotFound from './Pages/NotFound.js';
import Sobre from './Pages/Sobre.js';
import Header from "./Components/Header.js";
import Modulos from './Pages/Modulos.js';
import { Playbacks } from './Pages/Playbacks.js';
import { Exercicios } from './Pages/Exercicios.js';
import { M1A1, M1A2, M1A3, M1A4, M1A5, M1A6, M1A7 } from './Pages/Modulo1.js';
import Login from './Pages/Login.js';

export default function App() {
  const [autenticado, setAutenticado] = useState(() => {
    return localStorage.getItem("autenticado") === "true";
  });

  function login() {
    setAutenticado(true);
    localStorage.setItem("autenticado", "true");
  }

  function logout() {
    setAutenticado(false);
    localStorage.removeItem("autenticado");
  }

  function RotaProtegida({ children }) {
    return autenticado ? children : <Navigate to="/login" />;
  }

  return (
    <HashRouter>
      <Header autenticado={autenticado} onLogout={logout} />
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

          <Route path="/modulo-1/aula-1" element={<RotaProtegida><M1A1 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-2" element={<RotaProtegida><M1A2 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-3" element={<RotaProtegida><M1A3 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-4" element={<RotaProtegida><M1A4 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-5" element={<RotaProtegida><M1A5 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-6" element={<RotaProtegida><M1A6 /></RotaProtegida>} />
          <Route path="/modulo-1/aula-7" element={<RotaProtegida><M1A7 /></RotaProtegida>} />

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
